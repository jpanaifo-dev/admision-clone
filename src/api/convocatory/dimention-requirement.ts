'use server'
import { fetchAdmissionService } from '@/api/core'
import { ENDPOINTS_CONFIG } from '@/config/endpoints.config'
import { IDimensionRequirement } from '@/types/admission/IRequirement'

const API_BASE = ENDPOINTS_CONFIG.ADMISSION

export const fetchAdmissionDimensionRequirements = async (): Promise<{
    status: number
    data?: IDimensionRequirement[] | null
    errors?: string[]
}> => {

    const url = `${API_BASE.DIMENTION_REQUIREMENT}`

    try {
        const response = await fetchAdmissionService.get(url)

        if (!response.ok) {
            const errorResponse: {
                [key: string]: string[]
            } = await response.json()
            console.error('Error al validar el pago:', errorResponse)
            const errorMessages = Object.values(errorResponse).flat()
            console.error('Error al validar el pago:', errorMessages)
            return {
                status: response.status,
                errors: errorMessages,
                data: [],
            }
        }

        // Si el estado es exitoso, parseamos los datos
        const responseData: IDimensionRequirement[] = await response.json()
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

export const fetchAdmissionDimensionRequirementsById = async (id: number): Promise<{
    status: number
    data?: IDimensionRequirement | null
    errors?: string[]
}> => {

    const url = `${API_BASE.DIMENTION_REQUIREMENT}${id}/`

    try {
        const response = await fetchAdmissionService.get(url)

        if (!response.ok) {
            const errorResponse: {
                [key: string]: string[]
            } = await response.json()
            console.error('Error al validar el pago:', errorResponse)
            const errorMessages = Object.values(errorResponse).flat()
            console.error('Error al validar el pago:', errorMessages)
            return {
                status: response.status,
                errors: errorMessages,
                data: null,
            }
        }

        // Si el estado es exitoso, parseamos los datos
        const responseData: IDimensionRequirement = await response.json()
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