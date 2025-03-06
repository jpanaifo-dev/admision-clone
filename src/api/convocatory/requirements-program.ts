'use server'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { AtthachmentToRequirementType } from '@/modules/admision'
import { IRequirementProgram } from '@/types'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const fetchProgramRequirements = async (
  aplication_id: string
): Promise<{
  status: number
  data?: IRequirementProgram[] | null
  errors?: string[]
}> => {
  const url = `${API_BASE.APPLICANT_REQUIREMENT}`

  try {
    const response = await fetchAdmissionService.post(url, {
      applicantfile_id: aplication_id,
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('Error al validar el pago:', errorResponse)
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al validar el pago:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: null,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IRequirementProgram[] = await response.json()
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

export const attachFileToRequirement = async (
  data: AtthachmentToRequirementType
): Promise<{ status: number; errors?: string[] }> => {
  const url = `${API_BASE.ATTACH_FILE}`

  try {
    const response = await fetchAdmissionService.post(url, data)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('Error al validar el pago:', errorResponse)
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al validar el pago:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
      }
    }

    return {
      status: response.status,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
    }
  }
}
