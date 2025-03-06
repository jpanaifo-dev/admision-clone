import { HeaderSection } from '@/components/app';
import { CardReports } from '@/modules/admin/reports/card-reports';
import { Filter } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Reportes',
  description:
    'Consulta y gestiona los reportes de usuarios creados en el sistema.',
}


export default function Page() {

  return (
    <>
      <HeaderSection
        title="Historial de reportes"
        description='Gestiona la lista de reportes de cada convocatoria.'
        buttonLabel='Filtros Avanzados'
        hrefAddLink='/admin/reportes/filtros'
        addIcon={<Filter />}
        showExportButton={false}
        showRefreshButton={false}
      />
      <CardReports />
    </>
  )
}
