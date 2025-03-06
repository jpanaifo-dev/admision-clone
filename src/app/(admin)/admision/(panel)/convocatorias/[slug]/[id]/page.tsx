import { ProgramDetailsPage } from '@/modules/admision'
import {
  fetchProgramsCallBanner,
  fetchInfoProgram,
  fetchStudyPlanByToken,
  getApplicantValidate,
} from '@/api/convocatory'
import { getUserAuth } from '@/lib/session'
import { IUserAuth } from '@/types'
import { Metadata } from 'next'
import { APPLICATION_METADATA } from '@/config/metadata'

interface Props {
  params: {
    id: string
    slug: string
  }
  searchParams: {
    sede: string
  }
}

export async function generateMetadata({
  params,
  searchParams,
}: Props): Promise<Metadata> {
  // read route params
  const { id, slug } = await params
  const { sede } = await searchParams

  // fetch data
  const program = await fetchProgramsCallBanner({
    convocatory_token: slug,
    study_plan_token: id,
    headquarter_token: sede?.toString(),
  })

  return {
    title: APPLICATION_METADATA.PAGES.PROGRAM_DETAIL.title(
      program.data?.program?.name || 'No encontrado'
    ),
    description: APPLICATION_METADATA.PAGES.PROGRAM_DETAIL.description(
      program.data?.program?.name || 'Sin descripción'
    ),
    openGraph: {
      images: [`${program.data?.program?.background || ''}`],
    },
  }
}

export default async function Page({ params, searchParams }: Props) {
  const { id, slug } = await params
  const { sede } = await searchParams

  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  const [bannerData, programDetails, study_plan, isValidate] =
    await Promise.all([
      fetchProgramsCallBanner({
        convocatory_token: slug,
        study_plan_token: id,
        headquarter_token: sede?.toString(),
      }),
      fetchInfoProgram({
        convocatory_token: slug,
        study_plan_token: id,
        headquarter_token: sede?.toString(),
      }),
      fetchStudyPlanByToken(id),
      getApplicantValidate({
        person_token: data?.person_token,
        convocatory_token: slug,
      }),
    ])

  return (
    <ProgramDetailsPage
      plan_token={slug}
      program_banner={bannerData.data}
      program_details={programDetails.data}
      study_plan={study_plan.data}
      isValidate={isValidate?.data?.is_registered || false}
    />
  )
}
