'use client'

import { useState, useCallback } from 'react'
import { createConvocatory } from '@/api/convocatory/convocatory.actions'
import { IConvocatory, ICreateConvocatory } from '@/types/admission'

interface ConvocatoryResponse {
  status: number
  data?: IConvocatory | null
  errors?: string[]
}

function isConvocatory(data: unknown): data is IConvocatory {
  // Define las propiedades mínimas para determinar que el objeto es un IConvocatory
  return (
    typeof data === 'object' &&
    data !== null &&
    'description' in data &&
    'start_date' in data &&
    'end_date' in data &&
    'is_active' in data
  )
}

export function useCreateConvocatory() {
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string[] | null>(null)
  const [response, setResponse] = useState<IConvocatory | null>(null)

  const createNewConvocatory = useCallback(
    async (
      convocatoryData: Partial<ICreateConvocatory>
    ): Promise<ConvocatoryResponse> => {
      setLoading(true)
      setError(null)
      setResponse(null)

      try {
        const result = await createConvocatory(convocatoryData)

        if (result.errors) {
          setError(result.errors)
          return { status: result.status, errors: result.errors }
        }

        if (isConvocatory(result.data)) {
          setResponse(result.data)
          return { status: result.status, data: result.data }
        } else {
          console.error('Unexpected data format:', result.data)
          setError(['Unexpected data format.'])
          return { status: result.status, errors: ['Unexpected data format.'] }
        }
      } catch (err) {
        console.error('Unexpected error in useCreateConvocatory:', err)
        setError(['Unexpected server error.'])
        return {
          status: 500,
          errors: ['Unexpected server error.'],
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const editConvocatory = async (
    convocatoryData: Partial<IConvocatory>
  ): Promise<ConvocatoryResponse> => {
    setLoading(true)
    setError(null)
    setResponse(null)

    try {
      const result = await editConvocatory(convocatoryData)

      if (result.errors) {
        setError(result.errors)
        return { status: result.status, errors: result.errors }
      }

      if (isConvocatory(result.data)) {
        setResponse(result.data)
        return { status: result.status, data: result.data }
      } else {
        console.error('Unexpected data format:', result.data)
        setError(['Unexpected data format.'])
        return { status: result.status, errors: ['Unexpected data format.'] }
      }
    } catch (err) {
      console.error('Unexpected error in useCreateConvocatory:', err)
      setError(['Unexpected server error.'])
      return {
        status: 500,
        errors: ['Unexpected server error.'],
      }
    } finally {
      setLoading(false)
    }
  }

  return { createNewConvocatory, editConvocatory, loading, error, response }
}
