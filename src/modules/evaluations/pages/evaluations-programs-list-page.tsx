import React from 'react'
import { AdmissionProgramCard, ProgramBannerSection } from '../components'
import { EvaluationProgramFiltersSection } from './evaluation-program-filters-section'

export const EvaluationsProgramsListPage = () => {
  return (
    <main className="pt-4 flex flex-col gap-4">
      <ProgramBannerSection />
      <EvaluationProgramFiltersSection />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <AdmissionProgramCard
          title="Maestría en Gestión pública"
          studyPlanCode="Pla de estudions 2302- 2A - II"
          applicants={3002}
          status="Activo"
        />
      </div>
    </main>
  )
}
