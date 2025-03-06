import { HeaderSection } from '@/components/app'
import { AdmissionConvocationCard } from '../components'
import { admissionPeriods } from '../data/evaluation-data'
import FiltersSection from '@/modules/admin/pages/evaluations-history/components/filters-section'

export const EvaluationsListPage = () => {
  return (
    <main className="grid grid-cols-1 ">
      <HeaderSection
        title="Evaluaciones - Convocatorias abiertas"
        description="Lista de evaluaciones de postulaciones activas"
        disabledActions
      />
      <FiltersSection />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 pt-4 lg:pt-6">
        {admissionPeriods.map((period) => (
          <AdmissionConvocationCard
            key={period.id}
            title={period.title}
            description={period.description}
            startDate={period.startDate}
            endDate={period.endDate}
            programs={period.programs}
            status={period.status}
          />
        ))}
      </div>
    </main>
  )
}
