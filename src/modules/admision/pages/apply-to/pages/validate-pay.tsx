import { PaymentValidateForm } from '@/modules/admision'
import { IProgramBanner } from '@/types'

interface Props {
  email: string
  programData?: IProgramBanner | null
  person_uuid: string
  promotion_convocatory: number
}

export const ValidatePay = (props: Props) => {
  const { email, programData } = props
  return (
    <main className="container mx-auto py-14 flex flex-col gap-10 justify-center items-center min-h-screen">
      <PaymentValidateForm
        programData={programData}
        email={email}
        person_uuid={props.person_uuid}
        promotion_convocatory={props.promotion_convocatory}
      />
    </main>
  )
}
