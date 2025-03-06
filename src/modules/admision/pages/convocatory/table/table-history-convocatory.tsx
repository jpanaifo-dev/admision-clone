'use client'

import * as React from 'react'
import { DataTable } from '@/components/tables'
import { historycolumns } from './columns-hisory-convocatory'
import FiltersSection from '@/modules/admin/pages/evaluations-history/components/filters-section'

export interface IConvocatoryHistory {
  id: string
  convocatory_name: string
  date_register: string
  program_offering: string
  period_vigent: string
  status: string
}

const data: IConvocatoryHistory[] = [
  {
    id: '1',
    convocatory_name: 'Convocatoria 1',
    date_register: '2021-09-20',
    program_offering: 'Programa 1',
    period_vigent: '2021-2022',
    status: 'Activa',
  },
  {
    id: '2',
    convocatory_name: 'Convocatoria 2',
    date_register: '2021-09-20',
    program_offering: 'Programa 2',
    period_vigent: '2021-2022',
    status: 'Activa',
  },
  {
    id: '3',
    convocatory_name: 'Convocatoria 3',
    date_register: '2021-09-20',
    program_offering: 'Programa 3',
    period_vigent: '2021-2022',
    status: 'Inactiva',
  },
  {
    id: '4',
    convocatory_name: 'Convocatoria 4',
    date_register: '2021-09-20',
    program_offering: 'Programa 4',
    period_vigent: '2021-2022',
    status: 'Inactiva',
  },
  {
    id: '5',
    convocatory_name: 'Convocatoria 5',
    date_register: '2021-09-20',
    program_offering: 'Programa 5',
    period_vigent: '2021-2022',
    status: 'Inactiva',
  },
]

export const TableHistoryConvocatory = () => {
  return (
    <main>
      <FiltersSection />

      <DataTable
        columns={historycolumns}
        data={data}
        hasPagination={true}
      />
    </main>
  )
}
