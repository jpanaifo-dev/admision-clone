"use client"

import { format, parse } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { useFilterFromUrl } from "@/lib/filter-url"

type searchParams = {
  initialDate?: string
}

type Iprops = {
  placeholder?: string
  className?: string
  searchParam?: searchParams
}

export function DatePickerFilter(props: Iprops) {
  const { placeholder, className, searchParam } = props

  const [date, setDate] = React.useState<Date | undefined>(
    searchParam?.initialDate ? parse(searchParam.initialDate, "yyyy-MM-dd", new Date()) : undefined
  )
  const { createFilter, removeFilter } = useFilterFromUrl()

  // Update URL params when date changes
  React.useEffect(() => {
    if (date) {
      createFilter({ key: "date", value: format(date, "yyyy-MM-dd") })
    } else {
      removeFilter({ key: "date" })
    }
  }, [date, createFilter, removeFilter])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[280px] justify-start text-left font-normal",
            !date && "text-muted-foreground", className
          )}
        >
          <CalendarIcon className="mr-1 h-4 w-4" />
          {date ? format(date, "PPP") : <span>{placeholder || "Fecha de creación"}</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-auto p-0"
        align="start"
        side="bottom"
      >
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
}
