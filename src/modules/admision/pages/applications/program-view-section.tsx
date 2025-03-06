import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { IProgramBanner } from '@/types'
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  CalendarDays,
  Clock,
  MapPin,
  Users,
} from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import Link from 'next/link'

const MESSAGE =
  '(**) Recuerda que la duración del programa es referencial y puede variar según las condiciones del año académico u otrsas circunstancias como la cantidad de alumnos matriculados o disponibilidad de docentes.'

export const ProgramViewSection = ({
  programData,
  url_redirect,
  hiddenBackButton,
}: {
  programData: IProgramBanner
  url_redirect: string
  hiddenBackButton?: boolean
}) => {
  const { months_duration } = programData

  return (
    <section className="w-full py-6 space-y-6 p-4 md:p-6 bg-white">
      {/* Header */}
      <div className="space-y-2 w-full">
        {!hiddenBackButton && (
          <Link
            href={url_redirect || '#'}
            className="flex items-center gap-2 text-sm text-muted-foreground mb-2 hover:text-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver
          </Link>
        )}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-extrabold tracking-tight">
            {programData.program.name}
          </h1>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Badge variant="secondary">{programData.modality}</Badge>
          {programData.program.area.map((area) => (
            <Badge
              key={area.id}
              variant="secondary"
            >
              {area.name}
            </Badge>
          ))}
          <Badge variant="secondary">
            {programData.program.study_plan.description}
          </Badge>
        </div>
        {/* Promotion Badge - if exists */}
        {programData.promotion && (
          <div className="mt-4">
            <Badge className="text-xs bg-primary-800 text-white hover:bg-primary-700">
              Convocatoria {programData?.convocatory?.description}
            </Badge>
          </div>
        )}
      </div>

      <Separator />

      {/* Main Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Duración: <strong>{programData.months_duration} meses</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Users className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Vacantes: <strong>{programData.vacancies}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <BookOpen className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Créditos:{' '}
            <strong>{programData.program.study_plan.total_credits}</strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Sede: <strong>{programData.headquarter.name}</strong>
          </span>
        </div>
      </div>

      {/* Dates */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Inicio de clases:{' '}
            <strong>
              {format(programData.class_start_date, "d 'de' MMMM 'de' yyyy", {
                locale: es,
              })}
            </strong>
          </span>
        </div>
        <Separator
          className="hidden sm:block h-4 w-[1px] bg-border"
          orientation="vertical"
        />
        <div className="flex items-center gap-2">
          <CalendarDays className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm">
            Fin de inscripciones:{' '}
            <strong>
              {format(
                programData.inscription_end_date,
                "d 'de' MMMM 'de' yyyy",
                {
                  locale: es,
                }
              )}
            </strong>
          </span>
        </div>
      </div>
      <div className="flex items-center text-sm gap-2">
        <div className="flex items-center gap-2 ">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Duración del programa:</span>
        </div>
        <span className="font-semibold">{months_duration} meses</span>
      </div>
      <div>
        <p className="text-sm text-gray-700">{MESSAGE}</p>
      </div>
    </section>
  )
}
