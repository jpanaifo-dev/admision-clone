import { IPerson } from '@/types'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { buildHeaders } from '../core/build-headers'
import { PersonInfoSchemaType } from '@/modules/admision'
import { fetchPersonService } from '@/api/core'

const API_BASE = ENDPOINTS_CONFIG.PERSON

export const updatePerson = async (
  personToken: string,
  data: PersonInfoSchemaType
): Promise<{
  status: number
  data?: IPerson
  errors?: string[]
}> => {
  const url = `${API_BASE.PERSON}${personToken}/`
  const formData = new FormData()
  for (const key in data) {
    if (data[key as keyof PersonInfoSchemaType] !== undefined) {
      formData.append(key, data[key as keyof PersonInfoSchemaType] as string)
    }
  }
  const headers = await buildHeaders('PERSON')

  try {
    const response = await fetchPersonService.put(url, formData, true, headers)
    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al actualizar la persona:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: undefined,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IPerson = await response.json()
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
