'use client'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useFilterFromUrl } from '@/lib/filter-url'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IPersonJob } from '@/types'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from '@/components/ui/form'
import { createOrUpdateJobPerson } from '@/api/persons'
import {
  PersonJobSchema,
  PersonJobType,
  useJobSector,
} from '@/modules/admision'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'
import { useRouter } from 'next/navigation'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { PROFILE_FORM_LABELS } from './config.constants'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { useState } from 'react'

const { JOB_FORM } = PROFILE_FORM_LABELS
const { TITLE, FIELDS } = JOB_FORM

interface DialogAcademicInfoFormProps {
  person_token?: string
  defaultData?: IPersonJob
}

export const DialogJobInfoForm = (props: DialogAcademicInfoFormProps) => {
  const { updateFilter } = useFilterFromUrl()
  const { defaultData, person_token } = props
  const { jobSectorList } = useJobSector()
  const router = useRouter()

  const [jobNow, setJobNow] = useState(defaultData?.end_date ? false : true)

  const id_degree = defaultData?.id

  const form = useForm<PersonJobType>({
    resolver: zodResolver(PersonJobSchema),
    defaultValues: {
      ...defaultData,
      person_token: person_token,
      area: defaultData?.area,
      company_name: defaultData?.company_name,
      job_sector: defaultData?.job_sector
        ? defaultData?.job_sector
        : jobSectorList[0]?.id,
      occupation: defaultData?.occupation || '',
      end_date: defaultData?.end_date || '',
      start_date: defaultData?.start_date || '',
    },
  })

  async function onSubmit(data: PersonJobType) {
    const response = defaultData
      ? await createOrUpdateJobPerson(data, id_degree)
      : await createOrUpdateJobPerson(data)
    if (response.status === 201 || response.status === 200) {
      toast.success(
        <ToastCustom
          title="Éxito"
          description={`${response?.message}`}
        />
      )
      router.push(ADMISSION_URLS_APP.PROFILE.JOB)
      router.refresh()
    } else {
      toast.error(
        <ToastCustom
          title="Error"
          description={`${response?.errors}`}
        />
      )
    }
  }

  const handleExit = () => {
    updateFilter({
      add: '',
      edit: '',
    })
  }

  return (
    <Dialog
      open
      onOpenChange={handleExit}
    >
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            {defaultData ? 'Editar ' : 'Agregar '}
            {TITLE}
          </DialogTitle>
          <DialogDescription>
            Por favor, completa la información solicitada a continuación para
            agregar o editar tu experiencia laboral.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="grid gap-4 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="space-y-4">
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
                            placeholder={FIELDS.workSector.placeholder}
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
                    <FormDescription>
                      {FIELDS.companyName.description}
                    </FormDescription>
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
                      <FormLabel htmlFor="job">
                        {FIELDS.workArea.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="job"
                          placeholder={FIELDS.workArea.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {FIELDS.workArea.description}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Institution */}
                <FormField
                  control={form.control}
                  name="occupation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="job">
                        {FIELDS.jobTitle.label}
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="job"
                          placeholder={FIELDS.jobTitle.placeholder}
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        {FIELDS.jobTitle.description}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>

              <FormField
                control={form.control}
                name="end_date"
                render={({ field: { onChange } }) => (
                  <FormItem>
                    <FormLabel>{FIELDS.endDate.label} </FormLabel>
                    <FormControl>
                      <div className="flex items-center gap-2 py-6">
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
                          disabled={jobNow}
                          placeholder={FIELDS.endDate.placeholder}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <p className="text-gray-500 text-sm col-span-2">
                  {FIELDS.endDate.description}
                </p>
              </section>
            </div>

            <DialogFooter>
              <Button type="submit">Guardar cambios</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
