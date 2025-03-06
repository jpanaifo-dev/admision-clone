/* eslint-disable react-hooks/exhaustive-deps */
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
import { useFilterFromUrl } from '@/lib/filter-url'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { IPersonJob } from '@/types'
import { Form } from '@/components/ui/form'
import { createOrUpdateJobPerson } from '@/api/persons'
import {
  PersonJobSchema,
  PersonJobType,
  useFormStore,
  useJobSector,
} from '@/modules/admision'
import { toast } from 'react-toastify'
import { AlertDialogCustom, ToastCustom } from '@/components/app'
import { useRouter } from 'next/navigation'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { PROFILE_FORM_LABELS } from '../config.constants'
import { useEffect, useState } from 'react'
import { DateRangeSection, JobInfosection } from './sections'

const { JOB_FORM } = PROFILE_FORM_LABELS
const { TITLE, DESCRIPTION, MESSAGE } = JOB_FORM

interface DialogAcademicInfoFormProps {
  person_token?: string
  defaultData?: IPersonJob
}

export const DialogJobInfoForm = (props: DialogAcademicInfoFormProps) => {
  const { updateFilter } = useFilterFromUrl()
  const { defaultData, person_token } = props
  const { jobSectorList } = useJobSector()
  const { setIsDirty } = useFormStore()
  const router = useRouter()

  const [isALertOpen, setIsAlertOpen] = useState(false) // Estado para controlar el AlertDialog
  const [isLoading, setIsLoading] = useState(false)

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
      end_date: defaultData?.end_date || undefined,
      start_date: defaultData?.start_date || '',
      job_modality: defaultData?.job_modality || '',
      country_uuid: defaultData?.country_uuid,
    },
  })

  const isDirty = form.formState.isDirty

  async function onSubmit(data: PersonJobType) {
    setIsLoading(true)
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
    setIsLoading(false)
  }

  useEffect(() => {
    setIsDirty(isDirty)
  }, [isDirty])

  const handleExit = () => {
    if (isDirty) {
      setIsAlertOpen(true)
    } else {
      updateFilter({ add: '', edit: '' })
    }
  }

  const handleConfirmExit = () => {
    setIsAlertOpen(false)
    updateFilter({ add: '', edit: '' })
  }

  const handleCancelExit = () => {
    setIsAlertOpen(false)
  }

  return (
    <>
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
            <DialogDescription>{DESCRIPTION}</DialogDescription>
          </DialogHeader>
          <p className="text-gray-500 text-sm">{MESSAGE}</p>
          <Form {...form}>
            <form
              className="grid gap-4 pb-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <div className="space-y-4">
                {/* Job Info */}
                <JobInfosection />
                {/* Date Range */}
                <DateRangeSection />
              </div>

              <DialogFooter>
                <Button
                  type="submit"
                  disabled={isLoading || !isDirty}
                >
                  Guardar cambios
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog */}
      <AlertDialogCustom
        open={isALertOpen}
        title="¿Estás seguro de salir?"
        description="Si sales sin guardar, perderás los cambios realizados."
        handleCancel={handleCancelExit}
        handleConfirm={handleConfirmExit}
      />
    </>
  )
}
