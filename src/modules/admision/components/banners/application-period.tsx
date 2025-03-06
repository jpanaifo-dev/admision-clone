import { Calendar, Clock8, Download } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { IEventCall } from '@/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { TimelineCard } from '../cards'
import { ScrollArea } from '@/components/ui/scroll-area'
import { getDaysLeft } from '../cards/functions'
import Link from 'next/link'

interface ApplicationPeriodProps {
  start: string
  end: string
  timeline: IEventCall[]
  url_regulations: string | null
}

export const ApplicationPeriod = (props: ApplicationPeriodProps) => {
  const { start, end, timeline, url_regulations } = props

  function formatDate(date: string) {
    return format(new Date(date), 'd MMMM, yyyy', { locale: es })
  }

  return (
    <article className="bg-[#0A1628] text-white p-4 py-5 rounded-sm flex flex-col sm:flex-row sm:items-center sm:justify-between border">
      <div className="flex items-start gap-3 w-full">
        <div className="mt-1 rounded-full bg-primary-500/10 p-2">
          <Calendar className="w-6 h-6 text-primary-500" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-medium">Periodo de postulación</h2>
          <p className="text-sm text-gray-200">
            {start && end
              ? `${formatDate(start)} al ${formatDate(end)}`
              : 'No hay fechas disponibles'}
          </p>
          <div className="flex items-center gap-2">
            <Clock8 className="w-4 h-4 text-gray-400" />
            <p className="text-xs text-gray-200">
              {start && end
                ? `Quedan ${getDaysLeft(start, end)} días para postular`
                : 'Fecha no disponible'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-3 w-ful sm:w-auto mt-4 sm:mt-0">
        <Button
          disabled={!url_regulations}
          className="w-full sm:w-auto"
        >
          <Link
            href={url_regulations || '#'}
            className="flex items-center gap-2"
            target="_blank"
          >
            <Download className="w-4 h-4" />
            Descargar Reglamento
          </Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="secondary"
              className="w-full sm:w-auto"
            >
              Cronograma completo
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-4xl">
            <DialogHeader>
              <DialogTitle>Cronograma de postulación</DialogTitle>
              <DialogDescription>
                Conoce las fechas importantes para el proceso de postulación.
              </DialogDescription>
              <ScrollArea className="rounded-md max-h-[calc(100vh-200px)]">
                <section className="flex flex-col gap-5 p-4">
                  {timeline.map((event) => (
                    <TimelineCard
                      key={event.id}
                      event={event}
                    />
                  ))}
                </section>
              </ScrollArea>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </article>
  )
}
