// 'use server'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { ApplicantType } from '@/modules/admision'
import { IRequirementProgram } from '@/types'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const saveAplicantFileSave = async (
  data: ApplicantType
): Promise<{
  status: number
  data?: IRequirementProgram[] | null
  errors?: string[]
}> => {
  const url = `${API_BASE.APPLICANT_FILE_SAVE}`

  const formData = new FormData()
  for (const key in data) {
    if (key === 'requirements') {
      data[key].forEach((req) => {
        formData.append('requirements', JSON.stringify(req))
        formData.append('requirement_file', req.requirement_file)
      })
    } else {
      if (data[key as keyof ApplicantType] !== undefined) {
        formData.append(key, data[key as keyof ApplicantType] as string)
      }
    }
  }

  try {
    const response = await fetchAdmissionService.post(url, formData, true)
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
