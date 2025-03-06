import { Card } from '@/components/ui/card'
import { IEventCall } from '@/types'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'

interface TimelineCardProps {
  event: IEventCall
}

export const TimelineCard = (props: TimelineCardProps) => {
  const { event } = props

  const getMonth = (date: string) => {
    const d = new Date(date)
    return format(d, 'MMMM', { locale: es })
  }

  const getDateDay = (date: string) => {
    const d = new Date(date)
    return format(d, 'dd')
  }

  const getDateFull = (date: string) => {
    const d = new Date(date)
    return format(d, 'dd/MM/yyyy')
  }

  const getEventStatus = () => {
    const now = new Date()
    const startDate = new Date(event.start_date)
    const endDate = new Date(event.end_date)

    if (now > endDate) {
      return 'past'
    } else if (now >= startDate && now <= endDate) {
      return 'current'
    } else {
      return 'upcoming'
    }
  }

  const getStatusStyles = () => {
    const status = getEventStatus()
    switch (status) {
      case 'past':
        return 'border-muted bg-muted/10 text-muted-foreground'
      case 'current':
        return 'border-success-200 bg-success-50/70 dark:bg-success-750/30'
      case 'upcoming':
        return 'border-warning-200 bg-warning-50/70 dark:bg-warning-750/30'
      default:
        return ''
    }
  }

  const getDotStyles = () => {
    const status = getEventStatus()
    switch (status) {
      case 'past':
        return 'bg-muted border-muted-foreground/30'
      case 'current':
        return 'bg-green-100 border-green-800'
        // return 'bg-success-800 border-success-500'
      case 'upcoming':
        return 'bg-warning-100 border-warning-500'
      default:
        return ''
    }
  }

  return (
    <div
      key={event.id}
      className="flex gap-4 items-center w-full"
    >
      <div>
        <h2
          className={cn(
            'font-semibold text-center capitalize',
            getEventStatus() === 'past' &&
              'text-muted-foreground line-through decoration-muted-foreground/50'
          )}
        >
          {getMonth(event.start_date.toString())}
        </h2>
        <hr className="border-slate-200 my-2 border-1 w-20" />
        <div
          className={cn(
            'text-2xl font-bold text-center',
            getEventStatus() === 'past' &&
              'text-muted-foreground line-through decoration-muted-foreground/50'
          )}
        >
          {getDateDay(event.start_date.toString())}
        </div>
      </div>
      <div className="relative pl-8 border-l-2 border-slate-200 w-full">
        <div
          className={cn(
            'absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full border-2 transition-colors',
            getDotStyles()
          )}
        />
        <Card
          className={cn('p-4 border-l-8 transition-colors', getStatusStyles())}
        >
          <h3
            className={cn(
              'font-bold mb-2 text-sm uppercase',
              getEventStatus() === 'past' &&
                'text-muted-foreground line-through decoration-muted-foreground/50',
              getEventStatus() === 'current' && 'text-lg font-extrabold'
            )}
          >
            {event.name}
          </h3>
          <p
            className={cn(
              'text-xs capitalize text-muted-foreground mb-2',
              getEventStatus() === 'current' && 'text-green-500'
            )}
          >
            {event.name}
          </p>
          <section className="flex items-center gap-2">
            <Calendar
              className={cn(
                'w-4 h-4',
                getEventStatus() === 'past'
                  ? 'text-muted-foreground'
                  : getEventStatus() === 'current'
                  ? 'text-green-800'
                  : 'text-warning-600'
              )}
            />
            <p
              className={cn(
                'text-sm font-semibold',
                getEventStatus() === 'past'
                  ? 'text-muted-foreground line-through decoration-muted-foreground/50'
                  : getEventStatus() === 'current'
                  ? 'text-green-800'
                  : 'text-warning-600'
              )}
            >
              {getDateFull(event.start_date.toString())} -{' '}
              {getDateFull(event.end_date.toString())}
            </p>
          </section>
        </Card>
      </div>
    </div>
  )
}
