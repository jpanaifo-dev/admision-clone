import { HeaderSection } from '@/components/app'
import { TableHistoryConvocatory } from '@/modules/admision/pages/convocatory/table/table-history-convocatory'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Historial de Convocatorias',
  description: 'Consulta todas las convocatorias realizadas en el sistema.',
}

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Historial de convocatorias"
        description="Gestiona la lista de convocatorias, edita, agrega."
        disabledActions
        showDivider
      />
      <TableHistoryConvocatory />
    </>
  )
}
