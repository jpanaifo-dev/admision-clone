import { DropzoneCustom } from '@/components/app'
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { AcademicLanguageType } from '@/modules/admision/schemas'
import { useFormContext } from 'react-hook-form'
import { PROFILE_FORM_LABELS } from '../../config.constants'

const { LANGUAGE_FORM } = PROFILE_FORM_LABELS
const { FIELDS } = LANGUAGE_FORM

export const FileCertificateSection = () => {
  const form = useFormContext<AcademicLanguageType>()

  return (
    <>
      <FormField
        control={form.control}
        name="file"
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel>{FIELDS.certificate.label}</FormLabel>
            <FormDescription>{FIELDS.certificate.description}</FormDescription>
            <FormControl>
              <DropzoneCustom
                onDrop={(files) => {
                  onChange(files)
                }}
                accept={{
                  'application/pdf': ['.pdf'],
                }}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
