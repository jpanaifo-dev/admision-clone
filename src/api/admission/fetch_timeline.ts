'use server'

import { get } from './fetch-client'
import { ITimeline } from '@/types/admision/ITimeline'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

export async function getTimeline() {
  const response = await get<ITimeline[]>(
    ENDPOINTS_CONFIG.ADMISSION.TIMELINE,
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
}
