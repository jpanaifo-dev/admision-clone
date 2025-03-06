import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { AcademicLanguageType } from '@/modules/admision/schemas'
import { useFormContext } from 'react-hook-form'
import { languageLevels, PROFILE_FORM_LABELS } from '../../config.constants'
import { Input } from '@/components/ui/input'

const { LANGUAGE_FORM } = PROFILE_FORM_LABELS
const { FIELDS } = LANGUAGE_FORM

export const LanguageInfoSection = () => {
  const form = useFormContext<AcademicLanguageType>()

  return (
    <>
      {/* LANGUAGE NAME */}
      <FormField
        control={form.control}
        name="language"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELDS.language.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={FIELDS.language.placeholder}
                {...field}
              />
            </FormControl>
            <FormDescription>{FIELDS.language.description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* LANGUAGE LEVEL */}
      <FormField
        control={form.control}
        name="level"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>{FIELDS.proficiency.label}</FormLabel>
            <FormControl>
              <Select
                value={value?.toString() || ''}
                onValueChange={(value) => {
                  onChange(Number(value))
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder={FIELDS.proficiency.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {languageLevels.map((level) => (
                    <SelectItem
                      key={level.id}
                      value={level.id.toString()}
                    >
                      {level.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormDescription>{FIELDS.proficiency.description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* INSTITUTION */}
      <FormField
        control={form.control}
        name="institution"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELDS.institution.label}</FormLabel>
            <FormControl>
              <Input
                placeholder={FIELDS.institution.placeholder}
                {...field}
              />
            </FormControl>
            <FormDescription>{FIELDS.institution.description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
