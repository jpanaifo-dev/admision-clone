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
import { Input } from '@/components/ui/input'
import { ConvocatoryCreateType } from '@/modules/admin/schemas'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

const { FIELDS } = CONVOCATION_INFO_FORM

export const DateRangeSection = () => {
  const form = useFormContext<ConvocatoryCreateType>()

  function parseAndAddDays(date: string, days: number) {
    return format(
      new Date(new Date(date).setDate(new Date(date).getDate() + days)),
      'yyyy-MM-dd',
      {
        locale: es,
      }
    )
  }

  return (
    <>
      <FormField
        control={form.control}
        name="start_date"
        render={({ field }) => (
          <FormItem className="flex flex-col md:flex-row w-full gap-2">
            <div className="flex flex-col w-full gap-2 max-w-md">
              <FormLabel>{FIELDS.START_DATE.label}</FormLabel>
              <FormDescription>{FIELDS.START_DATE.description}</FormDescription>
            </div>
            <div className="flex flex-col w-full gap-2">
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  placeholder={FIELDS.START_DATE.placeholder}
                  value={field.value ? parseAndAddDays(field.value, 2) : ''}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="end_date"
        render={({ field }) => (
          <FormItem className="flex flex-col md:flex-row w-full gap-2">
            <div className="flex flex-col w-full gap-2 max-w-md">
              <FormLabel>{FIELDS.END_DATE.label}</FormLabel>
              <FormDescription>{FIELDS.END_DATE.description}</FormDescription>
            </div>
            <div className="flex flex-col w-full gap-2">
              <FormControl>
                <Input
                  {...field}
                  type="date"
                  placeholder={FIELDS.END_DATE.placeholder}
                  value={field.value ? parseAndAddDays(field.value, 2) : ''}
                  onChange={(e) => {
                    field.onChange(e.target.value)
                  }}
                />
              </FormControl>
              <FormMessage />
            </div>
          </FormItem>
        )}
      />
    </>
  )
}
