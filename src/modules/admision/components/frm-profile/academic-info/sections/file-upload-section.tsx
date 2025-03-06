import { AcademicInfoType } from '@/modules/admision/schemas'
import { useFormContext } from 'react-hook-form'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { DropzoneCustom } from '@/components/app'
import { PROFILE_FORM_LABELS } from '../../config.constants'

const { EDUCATION_FORM } = PROFILE_FORM_LABELS
const { FIELDS } = EDUCATION_FORM

export const FileUploadSection = () => {
  const form = useFormContext<AcademicInfoType>()
  return (
    <>
      <FormField
        control={form.control}
        name="file"
        render={({ field: { onChange } }) => (
          <FormItem>
            <FormLabel>{FIELDS.uploadFile.label}</FormLabel>
            <FormDescription>{FIELDS.uploadFile.description}</FormDescription>
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
