'use client'

import * as React from 'react'
import { format, isValid } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { es } from 'date-fns/locale'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

type DateValue =
  | Date
  | { from: Date | undefined; to: Date | undefined }
  | undefined

interface DatePickerCustomProps {
  mode?: 'single' | 'range'
  value?: DateValue
  onChange?: (date: DateValue) => void
  placeholder?: string
  className?: string
}

export function DatePickerCustom({
  mode = 'single',
  value,
  onChange,
  placeholder = 'Seleccionar fecha',
  className,
}: DatePickerCustomProps) {
  const [date, setDate] = React.useState<DateValue>(value)

  React.useEffect(() => {
    setDate(value)
  }, [value])

  const handleSelect = (newDate: DateValue) => {
    setDate(newDate)
    onChange?.(newDate)
  }

  const formatDate = (date: DateValue): string => {
    if (!date) return placeholder
    if (mode === 'single' && date instanceof Date) {
      return isValid(date) ? format(date, 'PPP', { locale: es }) : placeholder
    }
    if (mode === 'range' && typeof date === 'object' && 'from' in date) {
      if (date.from && date.to) {
        return `${format(date.from, 'PPP', { locale: es })} - ${format(
          date.to,
          'PPP',
          { locale: es }
        )}`
      }
      if (date.from) {
        return `${format(date.from, 'PPP', { locale: es })} - `
      }
    }
    return placeholder
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-[280px] justify-start text-left font-normal',
            !date && 'text-muted-foreground',
            className
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDate(date)}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        {mode === 'single' && (
          <Calendar
            mode="single"
            selected={date as Date}
            onSelect={handleSelect}
            initialFocus
            locale={es}
          />
        )}
        {mode === 'range' && (
          <Calendar
            mode="range"
            selected={date as { from: Date | undefined; to: Date | undefined }}
            onSelect={(range) =>
              handleSelect({ from: range?.from, to: range?.to })
            }
            initialFocus
            locale={es}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}
