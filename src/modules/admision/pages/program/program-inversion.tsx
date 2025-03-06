/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useState, useEffect } from 'react'
import { Calculator, Calendar, Wallet } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import Image from 'next/image'

import { CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface ProgramInversionProps {
  quotas_max: number
  total_cost?: number
}

const COMISION = 1.0

export const ProgramInversion = (props: ProgramInversionProps) => {
  const { quotas_max = 1, total_cost } = props
  const TOTAL_COST = total_cost || 0

  const [cuotas, setCuotas] = useState(quotas_max)
  const [tipoPago, setTipoPago] = useState('cuotas')
  const [cuotaMensual, setCuotaMensual] = useState(0)
  const [costMensualComision, setCostMensualComision] = useState(0)

  useEffect(() => {
    if (tipoPago === 'cuotas') {
      const cuota = TOTAL_COST / cuotas
      setCuotaMensual(cuota)
      setCostMensualComision(cuota + COMISION)
    } else {
      setCuotaMensual(TOTAL_COST)
    }
  }, [cuotas, tipoPago])

  return (
    <main className="w-full max-w-3xl mx-auto flex flex-col gap-6 pb-6">
      <Card className=" p-6 bg-white rounded-md shadow-none">
        <div className="space-y-6">
          {/* Header */}
          <header className="flex items-start  mb-1 gap-4">
            <div className="flex items-center justify-center w-12 h-12 bg-primary-50 rounded-md shadow-md">
              <Calculator className="w-6 h-6 text-primary-800" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-800">
                Calculadora de Inversión
              </h1>
              <p className="text-gray-600 text-sm">
                Calcula tus pagos mensuales y planifica tu presupuesto
              </p>
            </div>
          </header>

          {/* Monto Input */}
          <div className="space-y-2">
            <div className="flex gap-3 items-center justify-center w-full flex-col">
              <h2 className="font-extrabold text-2xl lg:text-4xl xl:text-5xl">
                {TOTAL_COST.toLocaleString('es-PE', {
                  style: 'currency',
                  currency: 'PEN',
                  minimumFractionDigits: 2,
                })}
              </h2>
              <h3 className="font-medium text-gray-600">
                Monto total de la inversión
              </h3>
            </div>
          </div>

          {/* Tipo de Pago */}
          <div className="space-y-2">
            <Label className="text-gray-700">Tipo de Pago</Label>
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  tipoPago === 'unico'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary'
                }`}
                onClick={() => {
                  setTipoPago('unico')
                  setCuotas(1)
                }}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Pago Único</span>
                  <Switch checked={tipoPago === 'unico'} />
                </div>
              </div>
              <div
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  tipoPago === 'cuotas'
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary'
                }`}
                onClick={() => setTipoPago('cuotas')}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium">Pago en Cuotas</span>
                  <Switch checked={tipoPago === 'cuotas'} />
                </div>
              </div>
            </div>
          </div>

          {/* Número de Cuotas */}
          {tipoPago === 'cuotas' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label className="text-gray-700">Número de Cuotas</Label>
                <span className="text-primary font-medium">{cuotas} meses</span>
              </div>
              <Slider
                value={[cuotas]}
                onValueChange={(value) => setCuotas(value[0])}
                min={1}
                max={quotas_max}
                step={Math.floor(quotas_max / 3)}
                className="py-4"
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>1 mes</span>
                <span>
                  {quotas_max} {quotas_max > 1 ? 'meses' : 'mes'}
                </span>
              </div>
            </div>
          )}

          {/* Resultados */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
            <Card className="w-full max-w-sm bg-white shadow-sm rounded-sm p-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Cuota mensual</span>
                <Wallet className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                {cuotaMensual.toLocaleString('es-PE', {
                  style: 'currency',
                  currency: 'PEN',
                  minimumFractionDigits: 2,
                })}
              </div>
            </Card>
            <Card className="w-full max-w-sm bg-white shadow-sm rounded-sm p-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500">Monto total</span>
                <Wallet className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-2xl font-semibold text-gray-900">
                {TOTAL_COST.toLocaleString('es-PE', {
                  style: 'currency',
                  currency: 'PEN',
                  minimumFractionDigits: 2,
                })}
              </div>
            </Card>
            <Card className="w-full max-w-sm bg-white shadow-sm rounded-sm p-6">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-500"> Plazo Total</span>
                <Calendar className="h-5 w-5 text-gray-400" />
              </div>
              <div className="text-3xl font-semibold text-gray-900">
                <p className="text-2xl font-semibold tracking-tight">
                  {tipoPago === 'cuotas' ? `${cuotas}` : '1 mes'}
                  <span className="text-base text-gray-700 font-medium">
                    {tipoPago === 'cuotas' &&
                      `${cuotas > 1 ? ' meses' : ' mes'}`}
                  </span>
                </p>
              </div>
            </Card>
          </div>
        </div>
      </Card>
      <section className="flex flex-col sm:flex-row border-l-5 border-warning-500 px-6 py-7 gap-5 bg-warning-50  rounded-sm items-start sm:items-center">
        <Image
          alt="Compartir"
          src={'/brands/banco-de-la-nacion-4.svg'}
          width={180}
          height={280}
        />
        <div>
          <p className="text-sm font-medium">
            Ten en cuenta que el Banco de la Nación cobra una comisión de
            <span className="text-xl font-bold"> 1.00</span> por cada pago
            realizado.
          </p>
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <PricingCard
          title={'Cuota Mensual'}
          value={costMensualComision.toFixed(2)}
          subtitle="Pago mensual con comisión"
          description="¡Recuerda que el Banco de la Nación cobra una comisión por cada pago! "
        />
        <PricingCard
          title="Pago total"
          subtitle="Pago total del programa"
          description="¡Recuerda que el Banco de la Nación cobra una comisión por cada pago! "
          value={(costMensualComision * cuotas).toFixed(2)}
        />
      </div>
    </main>
  )
}

interface PricingCardProps {
  MONEDA?: string
  title?: string
  subtitle?: string
  description?: string
  value?: string
  // cuotas?: number
}

export const PricingCard = ({
  value = '0.00',
  title = 'Premium Anual',
  subtitle,
  description,
}: PricingCardProps) => {
  return (
    <Card
      className={cn(
        'w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black border-gray-700 hover:border-gray-600 transition-colors'
      )}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium text-white">
          {title}
        </CardTitle>
        {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="space-y-1">
          <p className="text-4xl font-bold text-white">
            {Number(value).toLocaleString('es-PE', {
              style: 'currency',
              currency: 'PEN',
              minimumFractionDigits: 2,
            })}
            {/* <span className="text-sm font-normal text-gray-400 ml-2">
              en {cuotas} cuotas
            </span> */}
          </p>
          {description && (
            <p className="text-sm text-gray-400 mt-2">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
