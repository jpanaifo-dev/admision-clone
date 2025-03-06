/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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
import { useUbigeo } from '@/modules/admision/hooks'
import { PersonInfoSchemaType } from '@/modules/admision/schemas'
import { IPerson } from '@/types'
import { ChevronsUpDown, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { PROFILE_FORM_LABELS } from '../config.constants'
import { format } from 'date-fns'
import { CountrySelect } from '../country-select'

const { PROFILE_FORM } = PROFILE_FORM_LABELS
const { ORIGIN_AND_BIRTH } = PROFILE_FORM
const { FIELDS, DESCRIPTION, TITLE } = ORIGIN_AND_BIRTH

interface PersonalInformationProps {
  defaultData?: IPerson
}

export const OriginBirthDay = (props: PersonalInformationProps) => {
  const { defaultData } = props
  const form = useFormContext<PersonInfoSchemaType>()
  const { ubigeoList, getUbigeoFilterData } = useUbigeo()

  const [query, setQuery] = useState<string>('')

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState<string>(
    defaultData?.ubigeo_birth_uuid || ''
  )

  //modal country
  const [openCountry, setOpenCountry] = useState(false)
  const [valueCountry, setValueCountry] = useState<string>(
    defaultData?.country_uuid || ''
  )

  useEffect(() => {
    const queryValue = query.trim() || value.trim()
    getUbigeoFilterData({ query: queryValue })
  }, [query || value])

  return (
    <section id="personal-birth-info-form">
      <header>
        <h2 className="text-2xl font-bold">{TITLE}</h2>
        <p>{DESCRIPTION}</p>
      </header>
      <section className="grid gap-4 md:grid-cols-6 py-7">
        <div className="col-span-1 sm:col-span-2">
          <FormField
            control={form.control}
            name="country_uuid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FIELDS.country.label}</FormLabel>
                <CountrySelect
                  open={openCountry}
                  setOpen={setOpenCountry}
                  defaultUuid={defaultData?.country_uuid || ''}
                  onChange={(currentValue) => {
                    setValueCountry(
                      currentValue === valueCountry
                        ? defaultData?.country_uuid || ''
                        : currentValue
                    )
                    field?.onChange(
                      currentValue === valueCountry
                        ? defaultData?.country_uuid || ''
                        : currentValue
                    )
                    setOpenCountry(false)
                  }}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1 sm:col-span-3">
          <FormField
            control={form.control}
            name="ubigeo_birth_uuid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FIELDS.birthplace.label}</FormLabel>
                <Popover
                  open={open}
                  onOpenChange={setOpen}
                >
                  <section className="flex items-center border rounded-md">
                    <PopoverTrigger
                      disabled={value !== ''}
                      asChild
                    >
                      <Button
                        variant="ghost"
                        role="combobox"
                        aria-expanded={open}
                        className="w-full justify-between"
                      >
                        {value
                          ? ubigeoList?.find(
                              (ubigeoList) => ubigeoList.uuid === value
                            )
                            ? `${
                                ubigeoList.find(
                                  (ubigeoList) => ubigeoList.uuid === value
                                )?.district
                              }, ${
                                ubigeoList.find(
                                  (ubigeoList) => ubigeoList.uuid === value
                                )?.province
                              }, Región de ${
                                ubigeoList.find(
                                  (ubigeoList) => ubigeoList.uuid === value
                                )?.region
                              } - ${
                                ubigeoList.find(
                                  (ubigeoList) => ubigeoList.uuid === value
                                )?.code
                              }`
                            : 'Seleccione su lugar de nacimiento'
                          : 'Seleccione su lugar de nacimiento'}
                        {!value && (
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        )}
                      </Button>
                    </PopoverTrigger>
                    {value && (
                      <TooltipProvider delayDuration={0}>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              onClick={(e) => {
                                e.stopPropagation()
                                setValue('')
                                field.onChange(undefined)
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
                  <PopoverContent className="w-full sm:min-w-96 lg:min-w-[540px] p-0">
                    <Command>
                      <div>
                        <Input
                          value={query}
                          onChange={(e) => {
                            setQuery(e.target.value)
                          }}
                          placeholder="Buscar ubicación..."
                        />
                      </div>
                      <CommandList>
                        <CommandEmpty>
                          No se encontraron resultados.
                        </CommandEmpty>
                        <CommandGroup>
                          {ubigeoList?.map((address) => (
                            <CommandItem
                              key={address.uuid}
                              value={address.uuid}
                              onSelect={(currentValue) => {
                                setValue(
                                  currentValue === value
                                    ? defaultData?.ubigeo_birth_uuid || ''
                                    : currentValue
                                )
                                field?.onChange(
                                  currentValue === value
                                    ? defaultData?.ubigeo_birth_uuid || ''
                                    : currentValue
                                )
                                setOpen(false)
                              }}
                            >
                              {address?.district}, {address?.province}, Región
                              de {address?.region} - {address?.code}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="col-span-1">
          <FormField
            control={form.control}
            name="birthdate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FIELDS.birthdate.label}</FormLabel>
                <Input
                  type="date"
                  {...field}
                  max={format(
                    new Date(
                      new Date().setFullYear(new Date().getFullYear() - 18)
                    ),
                    'yyyy-MM-dd'
                  )}
                  className="w-full flex justify-between items-center px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={field?.value || ''}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>
    </section>
  )
}
