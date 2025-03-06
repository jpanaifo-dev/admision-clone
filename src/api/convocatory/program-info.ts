'use server'
import { IProgramBannerFilter, IProgramDetails } from '@/types'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const fetchInfoProgram = async (
  filters: IProgramBannerFilter
): Promise<{
  status: number
  data?: IProgramDetails | null
  errors?: string[]
}> => {
  const url = `${API_BASE.INFO_PROGRAM}`

  try {
    const response = await fetchAdmissionService.post(url, {
      convocatory_token: filters.convocatory_token,
      study_plan_token: filters.study_plan_token,
      headquarter_token: filters.headquarter_token,
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: null,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IProgramDetails = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: null,
    }
  }
}
