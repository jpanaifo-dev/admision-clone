import { HeaderSection } from '@/components/app'
import { ADMIN_URLS_APP } from '@/config/urls-data/admin.urls.config'
import { Metadata } from 'next'

const CONVOCATORIES_METADATA = {
  title: 'Convocatorias Activas',
  description: 'Consulta las convocatorias activas en el sistema.',
}

const CONVOCAORIES_CONTENT = {
  title: 'Convocatorias abiertas',
  description:
    'Gestiona las convocatorias activas en el sistema. Puedes agregar, editar o eliminar convocatorias.',
}

export const metadata: Metadata = CONVOCATORIES_METADATA

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HeaderSection
        title={CONVOCAORIES_CONTENT.title}
        description={CONVOCAORIES_CONTENT.description}
        hrefAddLink={ADMIN_URLS_APP.CONVOCATORIES.CREATE}
        showExportButton={false}
      />
      {children}
    </>
  )
}
