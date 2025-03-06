'use client'
import { useState, useEffect } from 'react'
import { fetchAcademicDegrees } from '@/api/persons'
import { IAcademicDegree, IFaculty, IFacultyFilter } from '@/types'
import { getFaculties } from '@/api/location'

export const useAcademicDegree = () => {
  const [academicDegrees, setacademicDegrees] = useState<IAcademicDegree[]>([])
  const [faculties, setFaculties] = useState<IFaculty[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const getDocumentTypes = async () => {
      const response = await fetchAcademicDegrees()
      setacademicDegrees(response.data || [])
      setLoading(false)
    }

    getDocumentTypes()
  }, [])

  useEffect(() => {
    const getFacultiesList = async (filters: IFacultyFilter) => {
      const response = await getFaculties(filters)
      setFaculties(response.data || [])
      setLoading(false)
    }

    getFacultiesList({ is_faculty: true, is_active: true })
  }, [])

  return { academicDegrees, loading, faculties }
}
