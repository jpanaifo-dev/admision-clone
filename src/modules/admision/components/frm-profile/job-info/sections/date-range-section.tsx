'use client'
import { PersonJobType } from '@/modules/admision/schemas'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PROFILE_FORM_LABELS } from '../../config.constants'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const { JOB_FORM } = PROFILE_FORM_LABELS
const { FIELDS } = JOB_FORM

export const DateRangeSection = () => {
  const form = useFormContext<PersonJobType>()
  const [jobNow, setJobNow] = useState(
    form.getValues('end_date') === null ||
      form.getValues('end_date') === undefined
  )

  return (
    <>
      {/* Job Period */}
      <section className="grid gap-4 md:grid-cols-2">
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{FIELDS.startDate.label}</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...field}
                  placeholder={FIELDS.startDate.placeholder}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-col gap-2">
          <FormField
            control={form.control}
            name="end_date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{FIELDS.endDate.label}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...field}
                    value={field.value || ''}
                    disabled={jobNow}
                    required={!jobNow}
                    placeholder={FIELDS.endDate.placeholder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="end_date"
            render={({ field: { onChange } }) => (
              <FormItem>
                <FormControl>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="i-job"
                      checked={jobNow}
                      onCheckedChange={(value) => {
                        setJobNow(Boolean(value))
                        onChange(null)
                      }}
                    />
                    <Label htmlFor="ijob">Actualmente trabajo aquí</Label>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </section>
    </>
  )
}
