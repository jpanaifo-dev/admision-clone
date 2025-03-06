'use server'

import { fetchProgramService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { IKnowledgeArea } from '@/types/program/IKnowledgeArea'

const API_BASE = ENDPOINTS_CONFIG.PROGRAM

export const fetchKnowledgeArea = async (): Promise<{
  status: number
  data?: IKnowledgeArea[] | null
  errors?: string[]
}> => {
  try {
    const response = await fetchProgramService.get(`${API_BASE.KNOWLEDGE_AREA}`)

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
    const responseData: IKnowledgeArea[] = await response.json()

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
