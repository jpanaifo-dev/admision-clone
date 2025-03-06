'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CONVOCATION_INFO_FORM } from '../content-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Input } from '@/components/ui/input'
import { ConvocatoryCreateType } from '@/modules/admin/schemas'
import { usePeriods } from '@/modules/admin/hooks'

const { FIELDS } = CONVOCATION_INFO_FORM

export const BasicInfo = () => {
  const form = useFormContext<ConvocatoryCreateType>()
  const { periods, loading } = usePeriods()
  return (
    <>
      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex flex-col w-full gap-2 max-w-md">
              <FormLabel>{FIELDS.NAME.label}</FormLabel>
              <FormDescription>{FIELDS.NAME.description}</FormDescription>
            </div>

            <div className="flex flex-col w-full gap-2">
              <FormControl>
                <Input
                  {...field}
                  placeholder={FIELDS.NAME.placeholder}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="period_uuid"
        render={({ field }) => (
          <FormItem className="flex flex-col md:flex-row w-full gap-2">
            <div className="flex flex-col w-full gap-2 max-w-md">
              <FormLabel>{FIELDS.PERIOD.label}</FormLabel>
              <FormDescription>{FIELDS.PERIOD.description}</FormDescription>
            </div>
            <div className="flex flex-col w-full gap-2">
              <FormControl>
                {periods && (
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue
                        placeholder={
                          loading ? 'Cargando...' : 'Selecciona el periodo'
                        }
                        defaultValue={field.value}
                      />
                    </SelectTrigger>
                    <SelectContent>
                      {periods.map((period) => (
                        <SelectItem
                          key={period.uuid}
                          value={period.uuid}
                        >
                          Periodo {period.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  )
}
