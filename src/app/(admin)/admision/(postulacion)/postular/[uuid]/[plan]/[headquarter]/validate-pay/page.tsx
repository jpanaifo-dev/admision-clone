import { fetchProgramsCallBanner } from '@/api/convocatory'
import { TO_APPLY_METADATA } from '@/config/metadata'
import { getUserAuth } from '@/lib/session'
import { ValidatePay } from '@/modules/admision'
import { IUserAuth } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = TO_APPLY_METADATA.PAGES.VALIDATE_PAY
interface Props {
  params: { uuid: string; plan: string; headquarter: string }
}

export default async function Page(props: Props) {
  const { uuid, plan, headquarter } = props.params
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  const programDetails = await fetchProgramsCallBanner({
    convocatory_token: uuid,
    study_plan_token: plan,
    headquarter_token: headquarter,
  })

  return (
    <ValidatePay
      programData={programDetails?.data}
      email={data?.email}
      person_uuid={data?.person_token}
      promotion_convocatory={Number(programDetails?.data?.id)}
    />
  )
}
