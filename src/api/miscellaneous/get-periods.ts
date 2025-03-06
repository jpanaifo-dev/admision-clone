'use server'
import { fetchCoreService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { IPeriod, IPeriodFilter } from '@/types'

const API_BASE = ENDPOINTS_CONFIG.CORE

export const fetchPeriods = async (
  filters: IPeriodFilter
): Promise<{
  status: number
  data?: IPeriod[]
  errors?: string[]
}> => {
  const params = new URLSearchParams()

  for (const key in filters) {
    if (filters[key as keyof IPeriodFilter]) {
      params.append(key, filters[key as keyof IPeriodFilter] as string)
    }
  }

  const API_URL = `${API_BASE.PERIOD}?${params.toString()}`

  try {
    const response = await fetchCoreService.get(API_URL)
    if (!response.ok) {
      const errorResponse = await response.json()
      return {
        status: response.status,
        errors: errorResponse.errors || ['Error desconocido.'],
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IPeriod[] = await response.json()

    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
    }
  }
}
