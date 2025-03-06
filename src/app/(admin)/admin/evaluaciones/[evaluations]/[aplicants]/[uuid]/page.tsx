import { ApplicantProfile } from '@/modules/evaluations'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Detalle de postulante',
  description:
    'Detalle de un postulante inscrito en la convocatoria de panaería nuclear.',
}

export default function Page() {
  return <ApplicantProfile />
}
