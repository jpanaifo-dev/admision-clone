import { IConvocatory } from '@/types'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { ConvocatoryCreateType } from '@/modules/admin'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const createOrUpdateConvocatory = async (
  convocatoryData: ConvocatoryCreateType,
  id?: number
): Promise<{
  status: number
  data?: IConvocatory
  errors?: string[]
}> => {
  const url = `${API_BASE.CONVOCATORY}`

  const formData = new FormData()
  for (const key in convocatoryData) {
    if (convocatoryData[key as keyof ConvocatoryCreateType]) {
      const value = convocatoryData[key as keyof ConvocatoryCreateType]
      if (value instanceof File) {
        formData.append(key, value)
      } else if (value !== null && value !== undefined) {
        formData.append(key, value.toString())
      }
    }
  }
  try {
    const response = id
      ? await fetchAdmissionService.put(`${url}${id}/`, formData, true)
      : await fetchAdmissionService.post(url, formData, true)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: undefined,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IConvocatory = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: undefined,
    }
  }
}
