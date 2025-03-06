'use client'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { LanguageInfoFormProps } from '../profile.interfaces.props'
import { PROFILE_FORM_LABELS } from '../config.constants'
import { DialogLanguageInfoForm } from './dialog-language-info-form'
import { ProfileInfoCard } from '../../cards'
import { languageLevels } from '../config.constants'
import { ButtonLinkAdd } from '../button-link-add'
import { NoResults } from '@/modules/app'

const { LANGUAGE_FORM } = PROFILE_FORM_LABELS
const { TITLE, DESCRIPTION } = LANGUAGE_FORM

const URL_ADD = `${ADMISSION_URLS_APP.PROFILE.LANGUAGES}?add=true`

export function LanguageInfoForm(props: LanguageInfoFormProps) {
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
          {ButtonLinkAdd(URL_ADD, 'Añadir idioma')}
        </header>
        <section className="pb-6 flex flex-col gap-4">
          <NoResults
            isActive={isEmpty}
            title="No hay datos"
            message="Añade tus idiomas para continuar con el proceso de admisión."
            imageSrc="/svg/languages_not_found.svg"
          >
            {ButtonLinkAdd(URL_ADD, 'Añadir idioma')}
          </NoResults>
          {!isEmpty &&
            defaultData?.map((language, index) => (
              <ProfileInfoCard
                key={index}
                id={language.id}
                title={language.language}
                company={language.institution}
                subtitle={`Nivel: ${
                  languageLevels?.find(
                    (level) => level.id === Number(language.level)
                  )?.name || 'Desconocido'
                }`}
                hrefEdit={`${ADMISSION_URLS_APP.PROFILE.LANGUAGES}?edit=${language?.id}`}
                isFileUrl={language.file || undefined}
                variant="language"
              />
            ))}
        </section>
      </div>
      {activeDialog && (
        <DialogLanguageInfoForm person_token={props.person_token} />
      )}
      {idEdit && (
        <DialogLanguageInfoForm
          person_token={props.person_token}
          defaultData={props.languageInfo}
        />
      )}
    </form>
  )
}
