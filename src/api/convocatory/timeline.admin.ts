'use server'
import { IEventCall } from '@/types'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { revalidatePath } from 'next/cache'
import { CreateTimelineType } from '@/modules/admin'
import { format } from 'date-fns'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const updateEventCallBulk = async (
  eventCalls: CreateTimelineType,
  link: string
): Promise<{
  status: number
  data?: IEventCall[]
  errors?: string[]
}> => {
  const url = API_BASE.EVENT_CALL_BULK

  eventCalls.rows.forEach((eventCall) => {
    eventCall.start_date = format(
      new Date(eventCall.start_date as unknown as string),
      'yyyy-MM-dd'
    ) as unknown as Date
    eventCall.end_date = format(
      new Date(eventCall.end_date as unknown as string),
      'yyyy-MM-dd'
    ) as unknown as Date
  })

  try {
    const response = await fetchAdmissionService.put(
      url,
      eventCalls.rows,
      false
    )
    if (!response.ok) {
      const errorResponse: Record<string, string[]> = await response.json()
      console.error('Error al actualizar la convocatoria:', errorResponse)
      return {
        status: response.status,
        errors: Object.values(errorResponse).flat(),
      }
    }

    const responseData: IEventCall[] = await response.json()
    revalidatePath(link)
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

export const deleteEventCall = async (
  eventCallId: string,
  link: string
): Promise<{
  status: number
  data?: IEventCall
  errors?: string[]
}> => {
  const url = `${API_BASE.TIMELINE}${eventCallId}/`

  try {
    const response = await fetchAdmissionService.delete(url)
    if (!response.ok) {
      const errorResponse: Record<string, string[]> = await response.json()
      console.error('Error al eliminar la convocatoria:', errorResponse)
      return {
        status: response.status,
        errors: Object.values(errorResponse).flat(),
      }
    }

    revalidatePath(link)
    return {
      status: 204,
      errors: [],
    }
  } catch (error) {
    console.error('Error al realizar la petición:', error)
    return {
      status: 500,
      errors: ['Error al conectar con el servidor.'],
    }
  }
}
