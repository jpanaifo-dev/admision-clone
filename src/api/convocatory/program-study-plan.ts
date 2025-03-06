'use server'
import { IStudyPlanDetails } from '@/types'
import { fetchProgramService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const API_BASE = ENDPOINTS_CONFIG.PROGRAM

export const fetchStudyPlanByToken = async (
  plan_token: string
): Promise<{
  status: number
  data?: IStudyPlanDetails | null
  errors?: string[]
}> => {
  const url = `${API_BASE.INFO_STUDY_PLAN}`

  try {
    const response = await fetchProgramService.post(url, {
      study_plan_uuid: plan_token,
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
    const responseData: IStudyPlanDetails[] = await response.json()
    return {
      status: response.status,
      data: responseData[0],
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
