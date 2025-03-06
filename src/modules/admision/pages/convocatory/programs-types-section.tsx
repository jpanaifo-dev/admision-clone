import { ProgramTypeCard } from '../../components'
import { IProgramTypeCall } from '@/types'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
interface ProgramsTypesSectionProps {
  programsTypes: IProgramTypeCall[]
  path: string
}

export const ProgramsTypesSection = (props: ProgramsTypesSectionProps) => {
  const { programsTypes, path } = props

  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {programsTypes.map((programType, i) => (
        <div key={i}>
          <ProgramTypeCard
            title={programType?.program_type}
            quantity={programType?.count}
            url={`${
              ADMISSION_URLS_APP.CONVOCATION.URL_BASE
            }/${path}?type=${programType.program_type.toLowerCase()}`}
            color={i % 2 === 0 ? 'primary' : 'success'}
          />
        </div>
      ))}
    </section>
  )
}
