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
import { ConvocatoryCreateType } from '@/modules/admin/schemas'
import { DropzoneCustom } from '@/components/app'

const { FIELDS } = CONVOCATION_INFO_FORM

export const DocumentsSection = () => {
  const form = useFormContext<ConvocatoryCreateType>()

  return (
    <>
      <FormField
        control={form.control}
        name="regulation"
        render={({ field }) => (
          <FormItem className="flex flex-col md:flex-row w-full gap-4">
            <div className="flex flex-col w-full gap-2 max-w-md">
              <FormLabel>{FIELDS.REGULATION.label}</FormLabel>
              <FormDescription>{FIELDS.REGULATION.description}</FormDescription>
            </div>
            <FormControl className="w-full">
              <DropzoneCustom
                className="w-full h-16"
                onDrop={(files) => {
                  field?.onChange(files[0])
                }}
                accept={{
                  'application/pdf': ['.pdf'],
                }}
                maxSizeFile={2}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
