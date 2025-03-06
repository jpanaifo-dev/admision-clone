'use client'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { DialogAcademicInfoForm } from './dialog-academic-info-form'
import { ProfileInfoCard } from '@/modules/admision'
import { AcademicInfoFormProps } from '../profile.interfaces.props'
import { PROFILE_FORM_LABELS } from '../config.constants'
import { ButtonLinkAdd } from '../button-link-add'
import { NoResults } from '@/modules/app'

const { EDUCATION_FORM } = PROFILE_FORM_LABELS
const { TITLE, DESCRIPTION } = EDUCATION_FORM

const URL_ADD = `${ADMISSION_URLS_APP.PROFILE.ACADEMIC}?add=true`

export function AcademicInfoForm(props: AcademicInfoFormProps) {
  const { defaultData, activeDialog, idEdit } = props
  const isEmpty = !defaultData || defaultData.length === 0

  return (
    <form className="space-y-8 w-full">
      <div className="space-y-4">
        <header className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-semibold">{TITLE}</h2>
            <p className="text-gray-500 text-sm">{DESCRIPTION}</p>
          </div>
          {ButtonLinkAdd(URL_ADD, 'Añadir información académica')}
        </header>
        <section className="pb-6 flex flex-col gap-4">
          <NoResults
            isActive={isEmpty}
            title="No hay datos"
            message="Añade tu información académica para continuar con el proceso de admisión."
            imageSrc="/svg/person-academic.svg"
          >
            {ButtonLinkAdd(URL_ADD, 'Añadir información académica')}
          </NoResults>
          {!isEmpty &&
            defaultData?.map((academicInfo, index) => (
              <ProfileInfoCard
                key={index}
                id={academicInfo?.id}
                title={academicInfo?.program_career}
                start_date={academicInfo?.start_date || ''}
                end_date={academicInfo?.end_date || null}
                subtitle={`${academicInfo?.academic_degree.name} • (${academicInfo?.academic_degree.abbreviation})`}
                company={academicInfo?.institution}
                hrefEdit={`${ADMISSION_URLS_APP.PROFILE.ACADEMIC}?edit=${academicInfo?.id}`}
                isFileUrl={academicInfo?.file || undefined}
              />
            ))}
        </section>
      </div>
      {activeDialog && (
        <DialogAcademicInfoForm person_token={props.person_token} />
      )}
      {idEdit && (
        <DialogAcademicInfoForm
          person_token={props.person_token}
          defaultData={props.academicInfo}
        />
      )}
    </form>
  )
}
