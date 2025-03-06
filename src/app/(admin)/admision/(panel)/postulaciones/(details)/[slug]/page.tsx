import {
  fetchProgramRequirements,
  fetchProgramsCallBanner,
} from '@/api/convocatory'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { getUserAuth } from '@/lib/session'
import { ApplicationDetailsView } from '@/modules/admision'
import { IUserAuth } from '@/types'
import React from 'react'

interface IProps {
  params: {
    slug: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page({ params, searchParams }: IProps) {
  const { slug } = params
  const { plan, sede, application } = searchParams

  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  const filters = {
    convocatory_token: slug,
    study_plan_token: plan ? plan.toString() : '',
    headquarter_token: sede ? sede.toString() : '',
  }

  const programBanner = await fetchProgramsCallBanner(filters)
  const requirements = await fetchProgramRequirements(
    application?.toString() || ''
  )

  return (
    <>
      {programBanner?.data && requirements?.data && (
        <ApplicationDetailsView
          programBanner={programBanner?.data}
          requirements={requirements?.data}
          userAuth={data}
          application_id={application?.toString() || ''}
          convocatory_token={slug}
          url_redirect={ADMISSION_URLS_APP.APPLICATION.URL_BASE}
        />
      )}
    </>
  )
}
