import type { IProgramBanner } from '@/types'
import { Separator } from '@/components/ui/separator'
import { CreditCard, Info } from 'lucide-react'
import Link from 'next/link'
import { LANDINGS_URLS_APP } from '@/config/urls-data/admission.urls.config'

const MONT_INSCRIPTION = 300

const texts = {
  title: 'Información de inversión',
  totalCost: 'Costo del programa',
  semesterCost: 'Costo de matrícula',
  quantitySemesters: 'Total de matrículas',
  disclaimer:
    'Todos los pagos deben realizarse en el Banco de la Nación a través de la plataforma Págalo.pe o en sus oficinas.',
}

interface PaymentViewSectionProps {
  programBanner: IProgramBanner
}

export const PaymentViewSection = ({
  programBanner,
}: PaymentViewSectionProps) => {
  const { months_duration, cost_total } = programBanner

  const semesters = months_duration / 2
  const semesterCost = MONT_INSCRIPTION
  const matriculaTotal = semesterCost * semesters

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  }

  return (
    <section className="w-full py-6 space-y-6">
      <h2 className="text-xl font-semibold">{texts.title}</h2>
      <Separator />
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span>{texts.totalCost}</span>
          </div>
          <span className="font-semibold">{formatCurrency(cost_total)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span>{texts.semesterCost}</span>
          </div>
          <span className="font-semibold">{formatCurrency(semesterCost)}</span>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-4 w-4 text-muted-foreground" />
            <span>{texts.quantitySemesters}</span>
          </div>
          <p className="font-semibold">
            {formatCurrency(matriculaTotal)}{' '}
            <span className="text-muted-foreground text-sm font-medium">
              x {semesters} sem.
            </span>
          </p>
        </div>
      </div>
      <section className="flex flex-col gap-2">
        <div className="mt-4 flex items-start gap-2 font-medium">
          <div>
            <Info className="h-4 w-4 text-gray-800 mt-1" />
          </div>
          <p className="text-sm text-muted-foreground">{texts.disclaimer}</p>
        </div>
        <Link
          href={LANDINGS_URLS_APP.PAYMENTS.URL_BASE}
          passHref
          className="text-primary-800 hover:text-primary-700 text-sm pl-6 hover:underline"
          target="_blank"
        >
          Conoce más
        </Link>
      </section>
    </section>
  )
}
