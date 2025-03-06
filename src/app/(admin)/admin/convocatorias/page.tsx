import { HeaderSection } from '@/components/app'
import { ActiveAdmissionGrid } from '@/modules/admision'
import { Metadata } from 'next'
import { getConvocatories } from '@/api/admission/fetch-convocatory'

export const metadata: Metadata = {
  title: 'Convocatorias Activas',
  description: 'Consulta las convocatorias activas en el sistema.',
}

export default async function Page() {
  const convocatories = await getConvocatories()

  return (
    <>
      <HeaderSection
        title="Convocatorias abiertas"
        description="Gestiona las convocatorias activas en el sistema. Puedes agregar, editar o eliminar convocatorias."
        hrefAddLink={'#'}
      />
      <ActiveAdmissionGrid admission={convocatories.data} />
    </>
  )
}
