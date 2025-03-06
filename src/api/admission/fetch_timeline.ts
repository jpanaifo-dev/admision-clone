'use server'
import { get, post } from './fetch-client'
import { ITimeline } from '@/types/admision/ITimeline'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const URL_ADMISSION_TIMELINE = ENDPOINTS_CONFIG.ADMISSION.TIMELINE

export async function getTimelines() {
  const response = await get<ITimeline[]>(URL_ADMISSION_TIMELINE, 'admission')

  if (response.errors) {
    console.error('Error fetching timeline:', response.errors)
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

export async function getTimeline(id: number) {
  try {
    const response = await get<ITimeline>(
      `${URL_ADMISSION_TIMELINE}/${id}`,
      'admission'
    )

    if (response.errors) {
      console.error('Error fetching timeline:', response.errors)
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
    console.error('Error fetching timeline:', error)
    return {
      status: 500,
      errors: error,
    }
  }
}

export async function createTimeLine(data: Partial<ITimeline>) {
  try {
    const response = await post(URL_ADMISSION_TIMELINE, data, 'admission')

    if (response.errors) {
      console.error('Error creating timeline:', response.errors)
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
    console.error('Error creating timeline:', error)
    return {
      status: 500,
      errors: error,
    }
  }
}

export async function updateTimeLine(id: number, data: Partial<ITimeline>) {
  try {
    const response = await post(
      `${URL_ADMISSION_TIMELINE}/${id}`,
      data,
      'admission'
    )

    if (response.errors) {
      console.error('Error updating timeline:', response.errors)
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
    console.error('Error updating timeline:', error)
    return {
      status: 500,
      errors: error,
    }
  }
}

export async function deactivateTimeline(id: number) {
  try {
    const response = await post(
      `${URL_ADMISSION_TIMELINE}/${id}/`,
      { is_active: false },
      'admission'
    )

    if (response.errors) {
      console.error('Error deactivating timeline:', response.errors)
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
    console.error('Error deactivating timeline:', error)
    return {
      status: 500,
      errors: error,
    }
  }
}
