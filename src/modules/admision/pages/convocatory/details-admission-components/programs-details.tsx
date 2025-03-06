'use client'

import { AlertCustom, InputSearch } from '@/components/app'
import { SelectFilter } from '@/components/app/filters'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { ClipboardPen } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface Program {
  title: string
  period: string
  dateRange: string
}

const programs: Program[] = [
  {
    title: 'Maestría en panaderia termonuclear',
    period: 'Plan de estudio 2024-II',
    dateRange: 'Desde el 20 de febrero 2024 al 28 de marzo 2024',
  },
  {
    title: 'Maestría en marketing espacial',
    period: 'Plan de estudio 2024-II',
    dateRange: 'Desde el 20 de febrero 2024 al 28 de marzo 2024',
  },
  {
    title: 'Maestrías en ritmo musical',
    period: 'Plan de estudio 2024-II',
    dateRange: 'Desde el 20 de febrero 2024 al 28 de marzo 2024',
  },
]

const filters = [
  { value: 'active', label: 'Activo' },
  { value: 'inactive', label: 'Inactivo' },
  { value: 'pending', label: 'Pendiente' },
  { value: 'canceled', label: 'Cancelado' },
]

export const ProgramsDetail = () => {
  const pathname = usePathname()

  return (
    <main className="flex flex-col gap-y-4">
      <div className="pt-2">
        <AlertCustom
          title="Actualización de convocatoria"
          showIcon={true}
          type="warning"
        >
          Ten en cuenta que la actualización de la convocatoria solo se puede
          realizar mientras la etapa esté activa
        </AlertCustom>
      </div>
      <section className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-[300px]">
          <InputSearch placeholder="Buscar" />
        </div>
        <div className="flex gap-4">
          <SelectFilter
            filterKey="status"
            data={filters}
          />
          <Button
            variant={'ghost'}
            className="flex gap-x-2"
          >
            <ClipboardPen /> Actualizar asignados
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-y-4">
        {programs.map((program) => (
          <Link
            href={`${pathname}/${program.title}`}
            key={program.title}
          >
            <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
              <CardContent className="p-4">
                <Badge className="text-sm text-gray-500 bg-gray-100">
                  {program.period}
                </Badge>
                <h2 className="text-lg font-bold mt-1 text-primary-800">
                  {program.title}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  {program.dateRange}
                </p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  )
}
