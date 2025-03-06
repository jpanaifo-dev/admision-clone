'use client'
import { useState, useEffect } from 'react'
import { fetchPeriods } from '@/api/miscellaneous'
import { IPeriod, IPeriodFilter } from '@/types'

export const usePeriods = () => {
  const [periods, setPeriods] = useState<IPeriod[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadPeriods = async (filters: IPeriodFilter) => {
    try {
      const response = await fetchPeriods(filters)
      setPeriods(response.data || [])
    } catch (error) {
      setError(error as string)
      setPeriods([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPeriods({
      is_active: true,
    })
  }, [])

  return { periods, loading, loadPeriods, error }
}
