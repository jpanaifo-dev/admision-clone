import { HeaderSection } from '@/components/app'

export default async function Page() {
  return (
    <>
      <HeaderSection
        title={`Requisitos generales`}
        description={`En esta sección podrás agregar los requisitos generales de la convocatoria.`}
        hrefAddLink="/admin/convocatorias/requisitos/agregar"
      />
    </>
  )
}
