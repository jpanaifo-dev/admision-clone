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
import { Form } from '@/components/ui/form'
import { createOrUpdateAcademicPerson } from '@/api/persons'
import {
  AcademicInfoSchema,
  AcademicInfoType,
  useAcademicDegree,
  useFormStore,
} from '@/modules/admision'
import { toast } from 'react-toastify'
import { AlertDialogCustom, ToastCustom } from '@/components/app'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { DialogAcademicInfoFormProps } from '../profile.interfaces.props'
import { PROFILE_FORM_LABELS } from '../config.constants'
import { ScrollArea } from '@/components/ui/scroll-area'

import {
  DateRangeSection,
  FileUploadSection,
  StudyInfoSection,
} from './sections'
import { LoadingAbsolute } from '@/modules/app'

const { EDUCATION_FORM } = PROFILE_FORM_LABELS
const { TITLE, DESCRIPTION } = EDUCATION_FORM

export const DialogAcademicInfoForm = (props: DialogAcademicInfoFormProps) => {
  const { defaultData } = props
  const { updateFilter } = useFilterFromUrl()
  const { setIsDirty } = useFormStore()
  const { academicDegrees } = useAcademicDegree()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false) // Estado para controlar el AlertDialog

  const id_degree = defaultData?.id

  const form = useForm<AcademicInfoType>({
    resolver: zodResolver(AcademicInfoSchema),
    defaultValues: {
      ...defaultData,
      institution: defaultData?.institution || undefined,
      academic_degree: defaultData?.academic_degree,
      person_token: props.person_token,
      is_degree: false,
    },
  })

  const isDirty = form.formState.isDirty

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

  async function onSubmit(data: AcademicInfoType) {
    setIsLoading(true)
    const dataForm = {
      ...data,
      file: data.file ? data.file[0] : null,
    }

    if (dataForm.end_date && dataForm.start_date > dataForm.end_date) {
      setIsLoading(false)
      toast.error(
        <ToastCustom
          title="Error"
          description="La fecha de finalización debe ser mayor a la de inicio."
        />
      )
      return
    }

    if (dataForm.diploma_date && dataForm.start_date > dataForm.diploma_date) {
      setIsLoading(false)
      toast.error(
        <ToastCustom
          title="Error"
          description="La fecha de expedición del diploma debe ser mayor a la de inicio."
        />
      )
      return
    }

    const response = defaultData
      ? await createOrUpdateAcademicPerson(dataForm, id_degree)
      : await createOrUpdateAcademicPerson(dataForm)
    if (response.status === 201 || response.status === 200) {
      toast.success(
        <ToastCustom
          title="Éxito"
          description={`${response?.message}`}
        />
      )
      router.push(ADMISSION_URLS_APP.PROFILE.ACADEMIC)
      router.refresh()
    } else {
      toast.error(
        <ToastCustom
          title="Error"
          description={`${response?.errors}`}
        />
      )
    }
    setInterval(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <>
      <Dialog
        open
        onOpenChange={handleExit}
      >
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{TITLE}</DialogTitle>
            <DialogDescription>{DESCRIPTION}</DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <ScrollArea className="h-[calc(100vh-200px)] grid gap-4 pb-4">
                <div className="space-y-4 md:space-y-6 p-4">
                  {/* Study Info Section */}
                  <StudyInfoSection academicDegrees={academicDegrees} />
                  {/* Date Range Section */}
                  <DateRangeSection academicDegrees={academicDegrees} />
                  {/* File Upload Section */}
                  <FileUploadSection />
                </div>
              </ScrollArea>
              <DialogFooter className="flex justify-end">
                <Button
                  type="button"
                  variant="secondary"
                  onClick={handleExit}
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading || !isDirty}
                >
                  {isLoading ? 'Guardando...' : 'Guardar cambios'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* AlertDialog para confirmar salida sin guardar */}
      <AlertDialogCustom
        open={isAlertOpen}
        onOpenChange={setIsAlertOpen}
        title="¿Estás seguro de salir sin guardar los cambios?"
        description="Si sales sin guardar, perderás todos los cambios realizados."
        handleConfirm={handleConfirmExit}
        handleCancel={handleCancelExit}
        labelCancel="Sí, salir"
      />
      <LoadingAbsolute show={isLoading} />
    </>
  )
}
