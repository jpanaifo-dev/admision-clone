'use client'
import { ApplicationCard } from '@/modules/admision/components'
import { IApplicationRecord } from '@/types'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { NoResults } from '@/modules/app'
import { useRouter } from 'next/navigation'

interface ApplicationPageProps {
  applications_records: IApplicationRecord[] | null
}

export const ApplicationsPage = (props: ApplicationPageProps) => {
  const { applications_records } = props
  const isEmpty =
    applications_records === null || applications_records.length === 0
  const router = useRouter()

  const handleRedirect = (url: string) => {
    if (url) {
      router.push(url)
    }
  }
  return (
    <div className="container py-10 sm:py-16 flex flex-col space-y-4">
      <section>
        <h1 className="text-xl font-bold tracking-tight">
          Mi historial de postulaciones {applications_records?.length}
        </h1>
      </section>

      <div className="space-y-4">
        {!isEmpty &&
          applications_records?.map((application, index) => (
            <ApplicationCard
              key={index}
              title={application.convocatory_name}
              postulatedAt={application.created_at}
              program_name={application.program_name}
              documents={application.requirements.documents_presented}
              status={application.convocatory_status}
              variant={
                application?.convocatory_is_active ? 'warning' : 'default'
              }
              observations={
                application?.requirements.observations.length > 0
                  ? application.requirements.observations
                      .map((observation) => observation.observation)
                      .join(', ')
                  : 'Sin observaciones'
              }
              isOpen={application.convocatory_is_active}
              url_link={
                application.convocatory_is_active
                  ? ADMISSION_URLS_APP.APPLICATION.PROGRAM(
                      application.convocatory_uuid,
                      application.program_study_plan_uuid,
                      application.headquarter_uuid,
                      application.payment_uuid,
                      application.id.toString()
                    )
                  : ''
              }
            />
          ))}
        <NoResults
          isActive={isEmpty}
          title="No se encontraron postulaciones"
          message="No se encontraron postulaciones realizadas por el momento."
          buttonText="Ver convocatorias"
          onButtonClick={() =>
            handleRedirect(ADMISSION_URLS_APP.CONVOCATION.URL_BASE)
          }
        />
      </div>
    </div>
  )
}
