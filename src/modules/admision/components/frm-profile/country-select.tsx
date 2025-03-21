/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCountry } from '@/modules/admision/hooks'
import { ChevronsUpDown, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDebouncedCallback } from 'use-debounce'
import { ICountry } from '@/types'

const DEBOUNCE_TIME = 500

interface CountrySelectProps {
  open: boolean
  setOpen: (value: boolean) => void
  onChange: (value: string) => void
  placeholder?: string
  popoverClassName?: string
  defaultCountry: ICountry | null
}

export const CountrySelect = ({
  open,
  setOpen,
  defaultCountry,
  onChange,
  popoverClassName,
  placeholder,
}: CountrySelectProps) => {
  const { countryList, getCountryFilterData } = useCountry()

  const [valueCountry, setValueCountry] = useState<ICountry | null>(
    defaultCountry
  )
  const [queryCountry, setQueryCountry] = useState<string>('')
  const [debouncedQuery, setDebouncedQuery] = useState<string>('')

  // Debounce solo para la búsqueda, sin afectar el input en tiempo real
  const debounced = useDebouncedCallback((value: string) => {
    setDebouncedQuery(value)
  }, DEBOUNCE_TIME)

  // Ejecutar la búsqueda cuando el `debouncedQuery` cambia
  useEffect(() => {
    getCountryFilterData(debouncedQuery.trim())
  }, [debouncedQuery])

  const selectedCountry = valueCountry

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <section className="flex items-center border rounded-md">
        <PopoverTrigger
          disabled={!!selectedCountry}
          asChild
        >
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            type="button"
          >
            {selectedCountry
              ? `${selectedCountry.name}, ${selectedCountry.code}`
              : placeholder || 'Seleccione un país'}
            {!selectedCountry && (
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        {selectedCountry && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={(e) => {
                    e.stopPropagation()
                    setValueCountry(null)
                    onChange('')
                    setOpen(true)
                  }}
                  size="icon"
                  variant="ghost"
                  type="button"
                >
                  <X className="shrink-0 opacity-80 font-bold" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="dark">
                Limpiar selección
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </section>
      <PopoverContent
        className={cn(
          'w-full sm:min-w-96  lg:min-w-[540px] p-0',
          popoverClassName
        )}
      >
        <Command>
          <div>
            <Input
              value={queryCountry}
              onChange={(e) => {
                setQueryCountry(e.target.value) // Actualiza el estado en tiempo real
                debounced(e.target.value) // Llama a la búsqueda con debounce
              }}
              placeholder="Buscar ubicación..."
            />
          </div>
          <CommandList>
            <CommandEmpty>No se encontraron resultados.</CommandEmpty>
            <CommandGroup>
              {countryList?.map((country) => (
                <CommandItem
                  key={country.uuid}
                  value={country.uuid}
                  onSelect={() => {
                    setValueCountry(country)
                    onChange(country.uuid)
                    setOpen(false)
                  }}
                >
                  {country.name}, {country.code}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
