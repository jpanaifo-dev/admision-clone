import { getApplicantValidate } from '@/api/convocatory'
import { fetchProgressInfo } from '@/api/persons'
import { TO_APPLY_METADATA } from '@/config/metadata'
import { getUserAuth } from '@/lib/session'
import {
  AlreadyAppliedPage,
  ApplyToPage,
  ProfileCompletion,
} from '@/modules/admision'
import { IUserAuth } from '@/types'

import { Metadata } from 'next'

export const metadata: Metadata = TO_APPLY_METADATA.PAGES.TO_APPLY
interface Props {
  params: { uuid: string; plan: string; headquarter: string }
}

export default async function Page(props: Props) {
  const { uuid } = props.params
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  const [progress] = await Promise.all([
    fetchProgressInfo({ person_token: data?.person_token }),
  ])

  const [isValidate] = await Promise.all([
    getApplicantValidate({
      person_token: data?.person_token,
      convocatory_token: uuid,
    }),
  ])

  if (
    progress.status === 200 &&
    progress?.data &&
    Number(progress.data.progress_percentage) < 100
  ) {
    return <ProfileCompletion percentage={progress.data.progress_percentage} />
  }

  if (isValidate?.data?.is_registered === true) {
    return <AlreadyAppliedPage />
  }

  return <ApplyToPage />
}
