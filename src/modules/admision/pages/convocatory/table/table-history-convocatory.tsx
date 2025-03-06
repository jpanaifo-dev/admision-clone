'use client'

import * as React from 'react'
import { DataTable } from '@/components/tables'
import { historycolumns } from './columns-hisory-convocatory'

export interface IConvocatoryHistory {
  id: string
  convocatory_name: string
  date_register: string
  program_offering: string
  period_vigent: string
  status: string
}

import { IConvocatory } from '@/types/admission'
import FiltersSection from '@/modules/admin/pages/evaluations-history/components/filters-section'

interface IProps {
  data?: IConvocatory[]
}

export const TableHistoryConvocatory = (props: IProps) => {
  const { data = [] } = props

  return (
    <main>
      <FiltersSection filters={['status']} />
      <DataTable
        columns={historycolumns}
        data={data}
        hasPagination={true}
      />
    </main>
  )
}
