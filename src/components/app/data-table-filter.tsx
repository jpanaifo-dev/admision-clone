import React from 'react'
import { Filter } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export interface IFiltersItems {
  label: string
  key: string
  content: React.ReactNode
}

interface DataTableFilterProps {
  title?: string
  filtersItems: IFiltersItems[]
}

export const DataTableFilter = (props: DataTableFilterProps) => {
  const { title, filtersItems = [] } = props

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-dashed"
        >
          <Filter size={16} />
          {title || 'Filtros'}
          <Badge className="ml-2 rounded-full flex items-center justify-center bg-primary-700 w-2">
            3
          </Badge>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-[320px] p-0 border"
        align="start"
      >
        <main>
          <header className=" flex justify-between items-center py-4 px-6 border-b">
            <h1 className="text-base font-bold">Filtros</h1>
            <Button
              variant="outline"
              size="sm"
            >
              Guardar Filtro
            </Button>
          </header>
          <Accordion
            type="single"
            collapsible
            className="p-2 px-6"
          >
            {filtersItems.map((item, index) => (
              <AccordionItem
                key={index}
                value={item.key}
              >
                <AccordionTrigger>{item.label}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </main>
      </PopoverContent>
    </Popover>
  )
}
