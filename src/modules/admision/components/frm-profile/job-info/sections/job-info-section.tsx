import { PROFILE_FORM_LABELS } from '../../config.constants'
import { PersonJobType } from '@/modules/admision/schemas'
import { useFormContext } from 'react-hook-form'
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
import { useJobSector } from '@/modules/admision/hooks'
import { Input } from '@/components/ui/input'
import { WORK_MODALITIES } from '../work-modalities'
import { useState } from 'react'
import { CountrySelect } from '../../country-select'

const { JOB_FORM } = PROFILE_FORM_LABELS
const { FIELDS } = JOB_FORM

export const JobInfosection = () => {
  const form = useFormContext<PersonJobType>()
  const { jobSectorList, loading } = useJobSector()

  const defaultData = form.getValues()

  //modal country
  const [openCountry, setOpenCountry] = useState(false)
  const [valueCountry, setValueCountry] = useState<string>(
    defaultData?.country_uuid || ''
  )

  return (
    <>
      {/* Sector job */}
      <FormField
        control={form.control}
        name="job_sector"
        render={({ field: { value, onChange } }) => (
          <FormItem>
            <FormLabel>{FIELDS.workSector.label}</FormLabel>
            <FormControl>
              <Select
                value={value?.toString() || ''}
                onValueChange={(value) => {
                  onChange(Number(value))
                }}
                defaultValue={jobSectorList[0]?.id.toString()}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={
                      loading
                        ? 'Cargando lista ... '
                        : FIELDS.workSector.placeholder
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {jobSectorList.map((degree) => (
                    <SelectItem
                      key={degree.id}
                      value={degree.id.toString()}
                    >
                      {degree.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Modality */}
      <FormField
        control={form.control}
        name="job_modality"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELDS.modality.label}</FormLabel>
            <FormControl>
              <Select
                value={field.value || ''}
                onValueChange={field.onChange}
                defaultValue={WORK_MODALITIES[0].name}
              >
                <SelectTrigger>
                  <SelectValue placeholder={FIELDS.modality.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {WORK_MODALITIES.map((modality) => (
                    <SelectItem
                      key={modality.name}
                      value={modality.name}
                    >
                      {modality.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      {/* Country */}
      <FormField
        control={form.control}
        name="country_uuid"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELDS.country.label}</FormLabel>
            <CountrySelect
              popoverClassName="min-w-[332px]  md:w-[728px]"
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

      {/* Institution */}
      <FormField
        control={form.control}
        name="company_name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{FIELDS.companyName.label}</FormLabel>
            <FormControl>
              <Input
                {...field}
                placeholder="UNAN-Managua"
              />
            </FormControl>
            <FormDescription>{FIELDS.companyName.description}</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <section className="grid gap-4 md:grid-cols-2">
        {/* Area */}
        <FormField
          control={form.control}
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="job">{FIELDS.workArea.label}</FormLabel>
              <FormControl>
                <Input
                  id="job"
                  placeholder={FIELDS.workArea.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>{FIELDS.workArea.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Occupation */}
        <FormField
          control={form.control}
          name="occupation"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="job">{FIELDS.jobTitle.label}</FormLabel>
              <FormControl>
                <Input
                  id="job"
                  placeholder={FIELDS.jobTitle.placeholder}
                  {...field}
                />
              </FormControl>
              <FormDescription>{FIELDS.jobTitle.description}</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </section>
    </>
  )
}
