'use client'
import { IConvocatory, IEventCall, ITimeline } from '@/types/admission'
import { EmptyConvocatoryScheduleList, TimelineCard } from '@/modules/admision'
import { ProgramsTypesSection } from './programs-types-section'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface ConvocatoryDetailsProps {
  data?: ITimeline
  convocatorySelected?: IConvocatory
}

export const ConvocatoryDetails = (props: ConvocatoryDetailsProps) => {
  const { data, convocatorySelected } = props

  const eventsLength = data?.timeline?.length || 0
  const programsLength = data?.programs?.length || 0

  const orderEvents = (events: IEventCall[]) => {
    return events.sort((a, b) => {
      return (
        new Date(a.start_date)?.getTime() - new Date(b.start_date)?.getTime()
      )
    })
  }

  const orderedEvents = orderEvents(data?.timeline || [])

  const eventsEmpty = eventsLength === 0
  const programsEmpty = programsLength === 0

  const [showAllEvents, setShowAllEvents] = useState(false)

  return (
    <main className="flex flex-col gap-6">
      <section className="w-full">
        <h2 className="text-center sm:text-start font-bold text-lg">
          Detalle de la convocatoria: {''}
          {convocatorySelected?.description}
        </h2>
        <p className="text-gray-500 text-sm">
          {`Desde el ${format(
            new Date(convocatorySelected?.start_date || ''),
            'dd/MM/yyyy',
            { locale: es }
          )} hasta el ${format(
            new Date(convocatorySelected?.end_date || ''),
            'dd/MM/yyyy',
            { locale: es }
          )}`}
        </p>
      </section>
      <section className="flex flex-col gap-5">
        <h2 className="font-bold text-lg">Cronograma</h2>
        {!eventsEmpty && (
          <>
            {orderedEvents?.slice(0, 4).map((event) => (
              <TimelineCard
                key={event.id}
                event={event}
              />
            ))}
            {showAllEvents &&
              orderedEvents?.slice(4).map((event) => (
                <TimelineCard
                  key={event.id}
                  event={event}
                />
              ))}
            {data?.timeline && data.timeline.length > 4 && (
              <Button
                onClick={() => setShowAllEvents(!showAllEvents)}
                variant="ghost"
              >
                {showAllEvents ? 'Ver menos' : 'Ver más'}{' '}
                {showAllEvents ? <ChevronUp /> : <ChevronDown />}
              </Button>
            )}
          </>
        )}
        {eventsEmpty && <EmptyConvocatoryScheduleList />}
      </section>
      {!programsEmpty && (
        <section className="flex flex-col gap-6">
          <h2 className="font-bold text-lg">Programas en convocatoria</h2>
          <ProgramsTypesSection
            path={convocatorySelected?.uuid || '#'}
            programsTypes={data?.programs || []}
          />
        </section>
      )}
    </main>
  )
}
