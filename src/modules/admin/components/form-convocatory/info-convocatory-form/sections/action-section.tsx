'use client'
import React from 'react'
import { useFormContext } from 'react-hook-form'
import { CONVOCATION_INFO_FORM } from '../content-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { ConvocatoryCreateType } from '@/modules/admin/schemas'

const { FIELDS } = CONVOCATION_INFO_FORM

export const ActionSection = () => {
  const form = useFormContext<ConvocatoryCreateType>()

  return (
    <>
      <FormField
        control={form.control}
        name="is_public"
        render={({ field }) => (
          <FormItem className="flex flex-col w-full gap-4">
            <FormControl>
              <div className="border-input has-data-[state=checked]:border-ring relative flex w-full items-start gap-2 rounded-md border p-4 shadow-xs outline-none">
                <Switch
                  id={field.name}
                  className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 data-[state=checked]:[&_span]:translate-x-2 data-[state=checked]:[&_span]:rtl:-translate-x-2"
                  aria-describedby={`${field.name}-description`}
                  checked={field.value}
                  onCheckedChange={(value) => field.onChange(value)}
                />
                <div className="grid grow gap-2">
                  <Label htmlFor={field.name}>{FIELDS.PUBLIC.label}</Label>
                  <p
                    id={`${field.name}-description`}
                    className="text-muted-foreground text-xs"
                  >
                    {FIELDS.PUBLIC.description}
                  </p>
                </div>
              </div>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
