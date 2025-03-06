'use client'
import { useEffect, useState } from 'react'
import { getUniversities } from '@/api/location'
import { IResApi, IUniversity, IUniversityQuery } from '@/types'

const dataInit: IResApi<IUniversity> = {
  count: 0,
  next: null,
  previous: null,
  results: [],
}

export const useUniversity = () => {
  const [universities, setUniversities] = useState<IResApi<IUniversity>>({
    count: 0,
    next: null,
    previous: null,
    results: [],
  })
  const [loading, setLoading] = useState<boolean>(true)

  const getUniversitiesList = async (filters: IUniversityQuery) => {
    const response = await getUniversities(filters)
    setLoading(false)
    if (response.status !== 200) {
      setLoading(false)
      setUniversities(dataInit)
    } else {
      setUniversities(response?.data || dataInit)
    }
  }

  useEffect(() => {
    getUniversitiesList({})
  }, [])

  return { universities, loading, getUniversitiesList }
}
