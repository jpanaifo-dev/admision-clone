'use client'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardFooter } from '@/components/ui/card'
import { Calendar, Users } from 'lucide-react'
import Link from 'next/link'
import { cn } from '@/lib/utils'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'

interface ProgramAsideProps {
  total_cost: number
  // quota_cost: number
  // quotas: number
  start_date: string
  total_months: number
  vacancies: number
  url: string
  isValidate?: boolean
}

export const ProgramAside = (props: ProgramAsideProps) => {
  const {
    // quota_cost,
    // quotas,
    total_cost,
    start_date,
    total_months,
    url,
    vacancies,
    isValidate,
  } = props

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
      minimumFractionDigits: 0,
    }).format(amount)
  }

  return (
    <div className="sticky top-20">
      <Card className="w-full max-w-md overflow-hidden border-0 shadow-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="relative">
          <CardHeader className="space-y-2 pb-4">
            <h2 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              ¿Listo para aplicar?
            </h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Asegúrese de que tiene todos los documentos requeridos listos
              antes de comenzar su aplicación para el programa de Maestría en
              Ciencias de la Computación.
            </p>
          </CardHeader>
          <CardContent className="pb-6">
            <div className="rounded-xl backdrop-blur-sm bg-white/[0.03] p-5 space-y-4 border border-white/10">
              <div className="space-y-4 text-sm">
                <div className="flex flex-col items-start gap-8">
                  <div className="w-full">
                    <h3 className="font-semibold text-white pb-4">
                      Inversión total de
                    </h3>
                    <h3 className="text-xl sm:text-3xl lg:text-[46px] font-extrabold text-white">
                      {formatCurrency(total_cost)}.00
                    </h3>
                  </div>
                  <p className="text-gray-400 text-sm">
                    Duración del programa: {total_months} meses
                  </p>
                </div>
                <div className="group flex items-start gap-4 text-slate-300 transition-colors">
                  <div className="mt-0.5">
                    <Calendar className="w-5 h-5 text-violet-400" />
                  </div>
                  <p className="group-hover:text-white transition-colors">
                    Inicio de clases:{' '}
                    <span className="text-white font-semibold">
                      {start_date}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center pb-8">
            {!isValidate && (
              <Button
                className={cn(
                  'w-full relative group overflow-hidden rounded-lg',
                  'bg-gradient-to-r from-rose-500 to-pink-500',
                  'hover:from-rose-400 hover:to-pink-400',
                  'text-white font-medium py-6 shadow-lg',
                  'transition-all duration-300 ease-out',
                  'border border-white/10'
                )}
                asChild
              >
                <Link href={url || '#'}>
                  <span className="relative z-10">Comenzar aplicación</span>
                  <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-rose-400 to-pink-400 transition-transform duration-300" />
                </Link>
              </Button>
            )}
            {isValidate && (
              <div className="w-full grid grid-cols-1 gap-4">
                <hr />
                <p className="text-gray-300 text-sm">
                  Actualmente tienes una aplicación en progreso en esta
                  convocatoria
                </p>
                <Button
                  className={cn(
                    'w-full bg-warning-500',
                    'hover:bg-warning-700',
                    'text-white font-medium py-6 shadow-lg',
                    'border border-white/10'
                  )}
                  asChild
                >
                  <Link href={ADMISSION_URLS_APP.APPLICATION.URL_BASE}>
                    <span className="relative z-10">Ver mis aplicaciones</span>
                    <div className="absolute inset-0 -translate-y-full group-hover:translate-y-0 bg-gradient-to-r from-rose-400 to-pink-400 transition-transform duration-300" />
                  </Link>
                </Button>
              </div>
            )}
            <div className="flex items-center gap-2 mt-6 text-slate-300">
              <Users className="w-4 h-4 text-amber-400" />
              <p className="text-center text-sm">
                <span className="font-semibold text-white">{vacancies}</span>{' '}
                <span className="animate-pulse">vacantes disponibles</span>
              </p>
            </div>
          </CardFooter>
        </div>
      </Card>
    </div>
  )
}
