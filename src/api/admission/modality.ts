'use server'

import { fetchAdmissionService } from "../core"
import { IModality } from "@/types/admission/IModality"
import { ENDPOINTS_CONFIG } from "@/config/endpoints.config"

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export async function fetchModalities() :
Promise<{
  status: number
  data?: IModality[]
  errors?: string[]
}> {
  try {
    const response = await fetchAdmissionService.get(`${API_BASE.MODALITY}`)

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
    const responseData: IModality[] = await response.json()
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