'use client'
import { useState, useEffect } from 'react'
import { fetchJobsectors } from '@/api/persons'
import { IJobSector } from '@/types'

export const useJobSector = () => {
  const [jobSectorList, setJobSectorList] = useState<IJobSector[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string[] | null>(null)

  useEffect(() => {
    const getDocumentTypes = async () => {
      const response = await fetchJobsectors()
      if (response.status !== 200) {
        setError(
          response.errors || ['Error al obtener los tipos de documentos']
        )
        setLoading(false)
        return
      } else {
        setJobSectorList(response.data || [])
      }
    }

    getDocumentTypes()
  }, [])

  return { jobSectorList, loading, error }
}
