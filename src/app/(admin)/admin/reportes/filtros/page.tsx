import { HeaderSection } from "@/components/app";
import { FilterPages } from "@/modules/admin/reports/filter-pages";

export default function Page() {
  return (
    <>
      <HeaderSection
        title="Historial de reportes"
        description='Gestiona la lista de reportes de cada convocatoria.'
        disabledActions={true}
      />
      <FilterPages />
    </>
  )
}