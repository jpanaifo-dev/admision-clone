'use server'

import { get, post, put } from './fetch-client'
import { IConvocatory } from '@/types/admision/IConvocatory'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

export async function getConvocatories() {
  const response = await get<IConvocatory[]>(
    ENDPOINTS_CONFIG.ADMISSION.CONVOCATORY,
    'admission'
  )

  if (response.errors) {
    console.error('Error fetching convocatories:', response.errors)
    return {
      status: response.status,
      errors: response.errors,
    }
  }

  return {
    status: response.status,
    data: response.data,
  }
}

export async function getConvocatory(id: number) {
  const response = await get<IConvocatory>(
    `${ENDPOINTS_CONFIG.ADMISSION.CONVOCATORY}/${id}`,
    'admission'
  )

  if (response.errors) {
    console.error('Error fetching convocatory:', response.errors)
    return {
      status: response.status,
      errors: response.errors,
    }
  }

  return {
    status: response.status,
    data: response.data,
  }
}

export async function createConvocatory(
  convocatoryData: Partial<IConvocatory>
) {
  try {
    const response = await post(
      ENDPOINTS_CONFIG.ADMISSION.CONVOCATORY,
      convocatoryData,
      'admission'
    )

    if (response.errors) {
      console.error('Error creating convocatory:', response.errors)
      return {
        status: response.status,
        errors: response.errors,
      }
    }

    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return {
      status: 500,
      errors: ['Internal server error.'],
    }
  }
}

export async function updateConvocatory(
  convocatoryData: Partial<IConvocatory>,
  id: string
) {
  try {
    const response = await put(
      `${ENDPOINTS_CONFIG.ADMISSION.CONVOCATORY}/${id}`,
      convocatoryData,
      'admission'
    )

    if (response.errors) {
      console.error('Error updating convocatory:', response.errors)
      return {
        status: response.status,
        errors: response.errors,
      }
    }

    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return {
      status: 500,
      errors: ['Internal server error.'],
    }
  }
}

export async function deactivateConvocatory(id: number) {
  try {
    const response = await put(
      `${ENDPOINTS_CONFIG.ADMISSION.CONVOCATORY}/${id}`,
      { is_active: false },
      'admission'
    )

    if (response.errors) {
      console.error('Error deactivating convocatory:', response.errors)
      return {
        status: response.status,
        errors: response.errors,
      }
    }

    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    console.error('Unexpected error:', error)
    return {
      status: 500,
      errors: ['Internal server error.'],
    }
  }
}
