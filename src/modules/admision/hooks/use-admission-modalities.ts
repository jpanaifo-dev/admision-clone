'use client'
import { useState, useEffect } from 'react'
import { IAdmissionModality } from '@/types'
import { fetchAdmissionModalities } from '@/api/convocatory'

export const useAdmisionModalities = () => {
  const [admissionModalities, setAdmissionModalities] = useState<
    IAdmissionModality[]
  >([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string[] | null>(null)

  useEffect(() => {
    const getUbigeoList = async () => {
      const response = await fetchAdmissionModalities()
      if (response.status !== 200) {
        setError(
          response.errors || ['Error al obtener los tipos de documentos']
        )
        setLoading(false)
        return
      } else {
        setAdmissionModalities(response.data || [])
        setLoading(false)
      }
    }

    getUbigeoList()
  }, [])

  return { admissionModalities, loading, error }
}
