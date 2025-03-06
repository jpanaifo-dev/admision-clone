'use client'
import { AcademicInfoType } from '@/modules/admision/schemas'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { PROFILE_FORM_LABELS } from '../../config.constants'
import { Input } from '@/components/ui/input'
import { IAcademicDegree } from '@/types'

const { EDUCATION_FORM } = PROFILE_FORM_LABELS
const { FIELDS } = EDUCATION_FORM

export const DateRangeSection = ({
  academicDegrees,
}: {
  academicDegrees: IAcademicDegree[]
}) => {
  const form = useFormContext<AcademicInfoType>()
  const idDegree = form.watch('academic_degree')
  const degree = academicDegrees.find((degree) => degree.id === idDegree)
  const valuNameDegree = degree?.name
  const isStudent = valuNameDegree?.toLowerCase() === 'estudiante'.toLowerCase()

  return (
    <section className="grid gap-4 md:grid-cols-3 items-center">
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

      {!isStudent && (
        <>
          {/*end date */}
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
                    value={field.value ?? ''}
                    placeholder={FIELDS.endDate.placeholder}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/*diploma date */}
          <FormField
            control={form.control}
            name="diploma_date"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <FormLabel>{FIELDS.diplomaDate.label}</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={value ?? ''}
                    onChange={onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
    </section>
  )
}
