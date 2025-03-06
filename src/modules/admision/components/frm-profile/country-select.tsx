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

interface CountrySelectProps {
  open: boolean
  defaultUuid?: string
  setOpen: (value: boolean) => void
  onChange: (value: string) => void
  placeholder?: string
  popoverClassName?: string
}

export const CountrySelect = (props: CountrySelectProps) => {
  const {
    open,
    setOpen,
    defaultUuid,
    onChange,
    popoverClassName,
    placeholder,
  } = props
  const { countryList, getCountryFilterData } = useCountry()

  const [valueCountry, setValueCountry] = useState<string>(defaultUuid || '')
  const [queryCountry, setQueryCountry] = useState<string>('')

  useEffect(() => {
    const queryValue = queryCountry.trim() || valueCountry.trim()
    getCountryFilterData(queryValue)
  }, [queryCountry || valueCountry])

  return (
    <>
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <section className="flex items-center border rounded-md">
          <PopoverTrigger
            disabled={valueCountry !== ''}
            asChild
          >
            <Button
              variant="ghost"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {valueCountry
                ? countryList?.find((country) => country.uuid === valueCountry)
                  ? `${
                      countryList.find(
                        (country) => country.uuid === valueCountry
                      )?.name
                    },  ${
                      countryList.find(
                        (country) => country.uuid === valueCountry
                      )?.code
                    }`
                  : `${placeholder || 'Seleccione el país '}`
                : `${placeholder || 'Seleccione el país '}`}
              {!valueCountry && (
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              )}
            </Button>
          </PopoverTrigger>
          {valueCountry && (
            <TooltipProvider delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation()
                      setValueCountry('')
                    }}
                    size="icon"
                    variant="ghost"
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
            'w-full sm:min-w-96 lg:min-w-[340px] p-0',
            popoverClassName
          )}
        >
          <Command>
            <div>
              <Input
                value={queryCountry}
                onChange={(e) => {
                  setQueryCountry(e.target.value)
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
                    onSelect={(currentValue) => {
                      setValueCountry(
                        currentValue === valueCountry
                          ? defaultUuid || ''
                          : currentValue
                      )
                      onChange(
                        currentValue === valueCountry
                          ? defaultUuid || ''
                          : currentValue
                      )
                      setOpen(false)
                    }}
                  >
                    {country?.name}, {country?.code}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  )
}
