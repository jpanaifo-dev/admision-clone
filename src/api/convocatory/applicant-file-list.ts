'use server'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { ApplicantFileList } from '@/modules/admision'
import { IApplicationFileList } from '@/types'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const saveApplicantFileList = async (
  data: ApplicantFileList
): Promise<{
  status: number
  data?: IApplicationFileList | null
  errors?: string[]
}> => {
  const url = `${API_BASE.APPLICANT_FILE_LIST}`

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
        data: null,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IApplicationFileList = await response.json()
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
