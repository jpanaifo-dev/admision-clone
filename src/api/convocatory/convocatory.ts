'use server'
import { IConvocatory, IConvocatoryFilter } from '@/types'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { revalidatePath } from 'next/cache'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const fetchConvocatory = async (
  filters?: IConvocatoryFilter
): Promise<{
  status: number
  data?: IConvocatory[]
  errors?: string[]
}> => {
  const queryParams = new URLSearchParams()
  if (filters) {
    for (const key in filters) {
      queryParams.append(
        key,
        filters[key as keyof IConvocatoryFilter] as string
      )
    }
  }

  const url = `${API_BASE.CONVOCATORY}?${queryParams.toString()}`

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
    const responseData: IConvocatory[] = await response.json()
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

export const fetchConvocatoryList = async (
  filters?: IConvocatoryFilter
): Promise<{
  status: number
  data?: IConvocatory[]
  errors?: string[]
}> => {
  const queryParams = new URLSearchParams()
  if (filters) {
    for (const key in filters) {
      queryParams.append(
        key,
        filters[key as keyof IConvocatoryFilter] as string
      )
    }
  }

  const url = `${API_BASE.CONVOCATORY_LIST}?${queryParams.toString()}`

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
    const responseData: IConvocatory[] = await response.json()
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

export const fetchConvocatoryById = async (
  personToken: string
): Promise<{
  status: number
  data?: IConvocatory
  errors?: string[]
}> => {
  const url = `${API_BASE.CONVOCATORY}${personToken}/`

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
