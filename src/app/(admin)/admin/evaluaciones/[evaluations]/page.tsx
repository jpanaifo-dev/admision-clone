import { EvaluationsProgramsListPage } from '@/modules/evaluations'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Evaluaciones Activas',
  description:
    'Consulta las evaluaciones de las postulaciones activas en el sistema.',
}

export default function Page() {
  return <EvaluationsProgramsListPage />
}
