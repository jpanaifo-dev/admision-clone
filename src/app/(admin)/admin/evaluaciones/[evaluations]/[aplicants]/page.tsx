import { AplicantsListPage } from '@/modules/evaluations'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Postulantes de panadería nuclear',
  description:
    'Lista de postulantes inscritos en la convocatoria de panaería nuclear.',
}

export default function page() {
  return <AplicantsListPage />
}
