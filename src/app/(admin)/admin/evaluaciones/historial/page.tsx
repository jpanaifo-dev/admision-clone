import { HeaderSection } from '@/components/app'
import { DataTable } from '@/components/tables'
import { studentsData } from '@/data/student-data'
import { evaluationsHistoryColumns } from '@/modules/admin/pages/evaluations-history/components/evaluations-history-columns'
import FiltersSection from '@/modules/admin/pages/evaluations-history/components/filters-section'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historial de Evaluaciones',
  description: 'Consulta todas las evaluaciones realizadas en el sistema.',
}

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Historial de postulaciones"
        description="Gestiona las evaluaciones de los postulantes"
        disabledActions
      />
      <FiltersSection />
      <DataTable
        columns={evaluationsHistoryColumns}
        data={studentsData}
        hasPagination={true}
      />

    </>
  )
}
