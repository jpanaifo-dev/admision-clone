'use server'
import { IEventCall, IEventCallFilter, ITimeline } from '@/types'
import { fetchAdmissionService } from '@/api/core'

import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { revalidatePath } from 'next/cache'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const fetchTimelineByConvocatory = async (
  id_token: string
): Promise<{
  status: number
  data?: ITimeline
  errors?: string[]
}> => {
  const url = `${API_BASE.TIMELINE_CONVOCATORY}`

  try {
    const response = await fetchAdmissionService.post(url, {
      convocatory_token: id_token,
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: {},
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: ITimeline = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: {},
    }
  }
}

export const fetchTimeline = async (
  filters?: IEventCallFilter
): Promise<{
  status: number
  data?: IEventCall[]
  errors?: string[]
}> => {

  const queryParams = new URLSearchParams()
  if (filters) {
    for (const key in filters) {
      queryParams.append(
        key,
        filters[key as keyof IEventCallFilter] as string
      )
    }
  }

  const url = `${API_BASE.TIMELINE}?${queryParams.toString()}`

  try {
    const response = await fetchAdmissionService.get(url)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: [],
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IEventCall[] = await response.json()
    revalidatePath('/admin/convocatorias')
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: [],
    }
  }
}