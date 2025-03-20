'use client'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { ProfileInfoCard } from '@/modules/admision'
import { DialogJobInfoForm } from './dialog-job-info-form'
import { JobInfoFormProps } from '../profile.interfaces.props'
import { PROFILE_FORM_LABELS } from '../config.constants'
import { NoResults } from '@/modules/app'
import { ButtonLinkAdd } from '../button-link-add'

const { JOB_FORM } = PROFILE_FORM_LABELS
const { TITLE, DESCRIPTION } = JOB_FORM

const URL_ADD = `${ADMISSION_URLS_APP.PROFILE.JOB}?add=true`

export function JobInfoForm(props: JobInfoFormProps) {
  const { defaultData, activeDialog, idEdit, countryDefaultData } = props
  const isEmpty = !defaultData || defaultData.length === 0

  return (
    <form className="space-y-8 w-full">
      <div className="space-y-4">
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">{TITLE}</h2>
            <p className="text-gray-500 text-sm">{DESCRIPTION}</p>
          </div>
          {ButtonLinkAdd(URL_ADD, 'Añadir experiencia')}
        </header>
        <section className="pb-6 flex flex-col gap-4">
          <NoResults
            isActive={isEmpty}
            title="No hay datos"
            message="Añade tu experiencia laboral para continuar con el proceso de admisión."
            imageSrc="/svg/jobs_not_found.svg"
          >
            {ButtonLinkAdd(URL_ADD, 'Añadir experiencia')}
          </NoResults>
          {!isEmpty &&
            defaultData?.map((work, index) => (
              <ProfileInfoCard
                key={index}
                id={work.id}
                title={work.occupation}
                company={`${work.company_name} - ${work.job_sector.name}`}
                start_date={work.start_date || ''}
                end_date={work.end_date || null}
                subtitle={`Area: ${work.area}`}
                modality={work.job_modality}
                hrefEdit={`${ADMISSION_URLS_APP.PROFILE.JOB}?edit=${work?.id}`}
                variant="job"
              />
            ))}
        </section>
      </div>
      {activeDialog && (
        <DialogJobInfoForm
          person_token={props.person_token}
          countryDefaultData={null}
        />
      )}
      {idEdit && (
        <DialogJobInfoForm
          person_token={props.person_token}
          defaultData={props.jobInfo}
          countryDefaultData={countryDefaultData}
        />
      )}
    </form>
  )
}
