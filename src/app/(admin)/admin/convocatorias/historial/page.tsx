import { fetchConvocatoryList } from '@/api/convocatory/convocatory';
import { HeaderSection } from '@/components/app'
import { TableHistoryConvocatory } from '@/modules/admision/pages/convocatory/table/table-history-convocatory'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historial de Convocatorias',
  description: 'Consulta todas las convocatorias realizadas en el sistema.',
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const { search = '', status = '' } = await searchParams;

  const querySearch = Array.isArray(search) ? search.join(' ') : search;
  const queryStatus = Array.isArray(status) ? status.join(' ') : status;

  const convocatories = await fetchConvocatoryList({
    description__icontains: querySearch ? querySearch : '',
    is_active: queryStatus ? queryStatus === 'true' : undefined,
  });

  return (
    <>
      <HeaderSection
        title="Historial de convocatorias"
        description="Gestiona la lista de convocatorias, edita, agrega."
        disabledActions
        showDivider
      />
      <TableHistoryConvocatory data={convocatories?.data} />
    </>
  )
}
