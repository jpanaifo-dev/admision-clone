import { fetchAdmissionRequirements } from '@/api/convocatory/requirements'
import { HeaderSection } from '@/components/app'
import { RequirementsTable } from '@/modules/admin/pages/requirements/requirements-table'

export default async function Page() {
  const requirements = await fetchAdmissionRequirements()

  return (
    <>
      <HeaderSection
        title={`Requisitos generales`}
        description={`En esta sección podrás agregar los requisitos generales de la convocatoria.`}
        hrefAddLink="/admin/convocatorias/requisitos/agregar"
      />

      <RequirementsTable data={requirements.data} />
    </>
  )
}
