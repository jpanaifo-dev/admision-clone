'use server'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import {
  IRequirement,
  IRequirementCreate,
} from '@/types/admission/IRequirement'
import { revalidatePath } from 'next/cache'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const fetchAdmissionRequirements = async (): Promise<{
  status: number
  data?: IRequirement[] | null
  errors?: string[]
}> => {
  const url = `${API_BASE.REQUIREMENT}`

  try {
    const response = await fetchAdmissionService.get(url, {
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('Error al obtener requisitos:', errorResponse)
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al obtener requisitos:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: [],
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IRequirement[] = await response.json()
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

export const fetchAdmissionRequirementById = async (
  id: number
): Promise<{
  status: number
  data?: IRequirement | null
  errors?: string[]
}> => {
  const url = `${API_BASE.REQUIREMENT}${id}`

  try {
    const response = await fetchAdmissionService.get(url, {
      cache: 'no-store',
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('Error al obtener requisito:', errorResponse)
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error alobtener requisito:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: null,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IRequirement = await response.json()
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

export const createAdmissionRequirement = async (
  requirement: IRequirementCreate
): Promise<{
  status: number
  data?: IRequirementCreate
  errors?: string[]
}> => {
  const url = `${API_BASE.REQUIREMENT}`

  try {
    const response = await fetchAdmissionService.post(url, requirement)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('Error al crear el requisito:', errorResponse)
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al crear el requisito:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: requirement,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IRequirement = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: requirement,
    }
  }
}

export const updateAdmissionRequirement = async (
  requirement: IRequirement
): Promise<{
  status: number
  data?: IRequirement
  errors?: string[]
}> => {
  const url = `${API_BASE.REQUIREMENT}${requirement.id}/`

  try {
    const response = await fetchAdmissionService.put(url, requirement)

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      console.error('Error al actualizar el requisito:', errorResponse)
      const errorMessages = Object.values(errorResponse).flat()
      console.error('Error al actualizar el requisito:', errorMessages)
      return {
        status: response.status,
        errors: errorMessages,
        data: requirement,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IRequirement = await response.json()
    revalidatePath('/admin/convocatorias/requisitos')
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: requirement,
    }
  }
}
