import { DataTable } from '@/components/tables'
import { ApplicantsBannerSection } from '../components'
import { aplicantsColumn, IAplicants } from './aplicants-table-list-colum'
import FiltersSection from '@/modules/admin/pages/evaluations-history/components/filters-section'

const data: IAplicants[] = [
  {
    id: 1,
    postulant: 'Juan Perez',
    contact: '965623872',
    status: 'Evaluado',
    registerDate: '12/12/2021'
  },
  {
    id: 2,
    postulant: 'Maria Perez',
    contact: '965623872',
    status: 'No evaluado',
    registerDate: '12/12/2021'
  },
  {
    id: 3,
    postulant: 'Jose Perez',
    contact: '965623872',
    status: 'Evaluado',
    registerDate: '12/12/2021',
  }
]

export const AplicantsListPage = () => {
  return (
    <main className="pt-4 flex flex-col gap-4">
      <ApplicantsBannerSection />
      <FiltersSection />
      <DataTable
        columns={aplicantsColumn}
        data={data}
      />
    </main>
  )
}
