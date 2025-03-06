'use server'

import { fetchCoreService } from "../core/fetch-services"
import { IHeadquarter } from "@/types"
import { ENDPOINTS_CONFIG } from "@/config/endpoints.config"

const API_BASE = ENDPOINTS_CONFIG.CORE

export async function fetchHeadquarter() :
Promise<{
  status: number
  data?: IHeadquarter[]
  errors?: string[]
}> {
  try {
    const response = await fetchCoreService.get(`${API_BASE.HEADQUARTER}`)

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
    const responseData: IHeadquarter[] = await response.json()
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

{
}