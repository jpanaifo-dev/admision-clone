'use server'
import { fetchUserService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { SectionElement } from '@/types/sidebar/sidebar'
import { buildHeaders } from '../core/build-headers'

const API_BASE = ENDPOINTS_CONFIG.ACCOUNTS

export const fetchSidebarAdminMenu = async (
  user_token: string
): Promise<{
  status: number
  data?: SectionElement[]
  errors?: string[]
}> => {
  const API_URL = `${API_BASE.MENU}`
  const headers = await buildHeaders('ADMIN')
  const data = {
    user_token: user_token,
  }

  try {
    const response = await fetchUserService.post(API_URL, data, false, headers)
    if (!response.ok) {
      const errorResponse = await response.json()
      return {
        status: response.status,
        errors: errorResponse.errors || ['Error desconocido.'],
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: SectionElement[] = await response.json()

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
