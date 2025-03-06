'use server';

import { decrypt } from '@/lib/session';
import { cookies } from 'next/headers';
import { IUserAuth } from '@/types';

const isProduction = process.env.NODE_ENV === 'production';

const services = {
  user: isProduction
    ? process.env.APP_API_USER_SERVICE
    : process.env.APP_API_USER_SERVICE_LOCAL,
  admission: isProduction
    ? process.env.APP_API_ADMISSION_SERVICE
    : process.env.APP_API_ADMISSION_SERVICE_LOCAL,
};

const APP_NAME = process.env.APP_NAME;
const APP_TOKEN_ADMISION = process.env.APP_TOKEN_USER;

async function getHeaders() {
  const cookie = (await cookies()).get(`${APP_NAME}_session`)?.value;
  const session = await decrypt(cookie);
  const data: IUserAuth = (await session?.data) as unknown as IUserAuth;
  const token = data?.access_token;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (APP_TOKEN_ADMISION) {
    headers['app-token'] = APP_TOKEN_ADMISION;
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
}

async function request<TResponse, TBody = undefined>(
  serviceKey: keyof typeof services,
  method: string,
  path: string,
  body?: TBody,
  additionalOptions?: RequestInit
): Promise<{ status: number; data?: TResponse; errors?: string[] }> {
  const headers = await getHeaders();
  const baseUrl = services[serviceKey];
  if (!baseUrl) {
    throw new Error(`El servicio ${serviceKey} no está configurado.`);
  }
  const url = `${baseUrl}${path}`;

  const options: RequestInit = {
    method,
    headers,
    ...additionalOptions,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();

    if (!response.ok) {
      return {
        status: response.status,
        errors: [data?.message || 'An error occurred.'],
      };
    }

    return { status: response.status, data };
  } catch (error) {
    console.error('Fetch error:', error);
    return {
      status: 500,
      errors: ['Internal server error.'],
    };
  }
}

export async function get<TResponse>(
  path: string,
  serviceKey: keyof typeof services,
  additionalOptions?: RequestInit
) {
  return request<TResponse>(serviceKey, 'GET', path, undefined, additionalOptions);
}

export async function post<TResponse, TBody = undefined>(
  path: string,
  body: TBody,
  serviceKey: keyof typeof services,
  additionalOptions?: RequestInit
) {
  return request<TResponse, TBody>(serviceKey, 'POST', path, body, additionalOptions);
}

export async function put<TResponse, TBody = undefined>(
  path: string,
  body: TBody,
  serviceKey: keyof typeof services,
  additionalOptions?: RequestInit
) {
  return request<TResponse, TBody>(serviceKey, 'PUT', path, body, additionalOptions);
}

export async function del<TResponse>(
  path: string,
  serviceKey: keyof typeof services,
  additionalOptions?: RequestInit
) {
  return request<TResponse>(serviceKey, 'DELETE', path, undefined, additionalOptions);
}
