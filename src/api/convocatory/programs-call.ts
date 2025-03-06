'use server'
import { IProgramCallFilter, IProgramCallList, IResApi } from '@/types'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

const programsInit: IResApi<IProgramCallList> = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

export const fetchProgramsCall = async (
  filters: IProgramCallFilter
): Promise<{
  status: number
  data?: IResApi<IProgramCallList>
  errors?: string[]
}> => {
  const url = `${API_BASE.PROGRAMS_CONVOCATORY}`

  try {
    const response = await fetchAdmissionService.post(url, {
      convocatory_token: filters.convocatory_token,
      query: filters.query || '',
      program_type_name: filters.program_type_name,
    })

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[]
      } = await response.json()
      const errorMessages = Object.values(errorResponse).flat()
      return {
        status: response.status,
        errors: errorMessages,
        data: programsInit,
      }
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IResApi<IProgramCallList> = await response.json()
    return {
      status: response.status,
      data: responseData,
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
      data: programsInit,
    }
  }
}
