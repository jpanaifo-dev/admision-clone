'use server'
import { IConvocatory, ICreateConvocatory } from '@/types'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { revalidatePath } from 'next/cache'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const createConvocatory = async (
  convocatoryData: Partial<ICreateConvocatory>
): Promise<{
  status: number
  data?: IConvocatory
  errors?: string[]
}> => {
  const url = `${API_BASE.CONVOCATORY}`

  try {
    const response = await fetchAdmissionService.post(url, convocatoryData)

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

export const updateConvocatory = async (
  convocatoryData: Partial<IConvocatory>
): Promise<{
  status: number
  data?: IConvocatory
  errors?: string[]
}> => {
  const url = `${API_BASE.CONVOCATORY}${convocatoryData.id}/`

  try {
    const response = await fetchAdmissionService.put(url, convocatoryData)

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

export const updateStateConvocatory = async (
  id: number, // Cambiar a number porque la API usa ID numérico
  updates: Partial<Pick<IConvocatory, 'is_active' | 'is_public'>>
): Promise<{ status: number; errors?: string[] }> => {
  const url = `${API_BASE.CONVOCATORY}${id}/`

  try {
    // Obtener la convocatoria actual para enviar el objeto completo
    const existingResponse = await fetchAdmissionService.get(url)
    if (!existingResponse.ok) {
      return {
        status: existingResponse.status,
        errors: ['Error al obtener la convocatoria.'],
      }
    }

    const existingData: IConvocatory = await existingResponse.json()

    // Fusionar la data existente con las actualizaciones
    const updatedData: IConvocatory = {
      ...existingData,
      ...updates,
    }

    // Enviar el objeto completo con `PUT`
    const response = await fetchAdmissionService.put(url, updatedData)

    if (!response.ok) {
      const errorResponse: { [key: string]: string[] } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return { status: response.status, errors: errorMessages }
    }

    // Revalidar la caché para actualizar la UI
    revalidatePath('/admin/convocatorias')

    return { status: response.status }
  } catch (error) {
    console.error('Error al actualizar la convocatoria:', error)
    return { status: 500, errors: ['Error al conectar con el servidor.'] }
  }
}
