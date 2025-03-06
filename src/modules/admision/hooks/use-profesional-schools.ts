'use client'
import { useEffect, useState } from 'react'
import { getProfesionalSchools } from '@/api/location'
import { IProfessionalSchool, IProfessionalSchoolFilter } from '@/types'

// const dataInit: IResApi<IUniversity> = {
//   count: 0,
//   next: null,
//   previous: null,
//   results: [],
// }

export const useProfesionalSchools = () => {
  const [profesionalSchool, setProfesionalSchool] =
    useState<IProfessionalSchool[]>()
  const [loading, setLoading] = useState<boolean>(true)

  const getProfesionalSchoolsList = async (
    filters: IProfessionalSchoolFilter
  ) => {
    const response = await getProfesionalSchools(filters)
    setLoading(false)
    if (response.status !== 200) {
      setLoading(false)
      setProfesionalSchool([])
    } else {
      setProfesionalSchool(response?.data || [])
    }
  }

  useEffect(() => {
    getProfesionalSchools({})
  }, [])

  return { profesionalSchool, loading, getProfesionalSchoolsList }
}
