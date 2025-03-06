'use server'

import { get, post, put } from './fetch-client'
import { IRequirement } from '@/types/admission/IRequirement'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

export async function getRequirements() {
  const response = await get<IRequirement[]>(
    ENDPOINTS_CONFIG.ADMISSION.REQUIREMENT,
    'admission'
  )

  if (response.errors) {
    console.error('Error fetching requirement:', response.errors)
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

export async function getRequirement(id: number) {
  const response = await get<IRequirement>(
    `${ENDPOINTS_CONFIG.ADMISSION}/${id}`,
    'admission'
  )

  if (response.errors) {
    console.error('Error fetching requirement:', response.errors)
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

export async function createRequirement(data: Partial<IRequirement>) {
  try {
    const response = await post(
      ENDPOINTS_CONFIG.ADMISSION.ADMISSION_MODALITY,
      data,
      'admission'
    )

    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    console.error('Error creating requirement:', error)
    return {
      status: 500,
      errors: error,
    }
  }
}

export async function updateRequirement(
  id: string,
  data: Partial<IRequirement>
) {
  try {
    const response = await put(
      `${ENDPOINTS_CONFIG.ADMISSION.ADMISSION_MODALITY}/${id}`,
      data,
      'admission'
    )

    return {
      status: response.status,
      data: response.data,
    }
  } catch (error) {
    console.error('Error updating requirement:', error)
    return {
      status: 500,
      errors: error,
    }
  }
}

export async function deactiveRequirement(id: number) {
  try {
    const response = await put(
      `${ENDPOINTS_CONFIG.ADMISSION.ADMISSION_MODALITY}/${id}`,
      { is_active: false },
      'admission'
    )

    return {
      status: response.status,
    }
  } catch (error) {
    console.error('Error deleting requirement:', error)
    return {
      status: 500,
      errors: error,
    }
  }
}
