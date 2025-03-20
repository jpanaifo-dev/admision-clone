/* eslint-disable react-hooks/exhaustive-deps */
'use client'
import { useEffect, useState } from 'react'
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
import { createOrUpdateLanguagePerson } from '@/api/persons'
import {
  AcademicLanguageSchema,
  AcademicLanguageType,
  useFormStore,
} from '@/modules/admision'
import { toast } from 'react-toastify'
import { AlertDialogCustom, ToastCustom } from '@/components/app'
import { useRouter } from 'next/navigation'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { DialogLanguageInfoFormProps } from '../profile.interfaces.props'
import { PROFILE_FORM_LABELS } from '../config.constants'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FileCertificateSection, LanguageInfoSection } from './sections'
import { LoadingAbsolute } from '@/modules/app'

const { LANGUAGE_FORM } = PROFILE_FORM_LABELS
const { TITLE, DESCRIPTION, MESSAGE } = LANGUAGE_FORM

export const DialogLanguageInfoForm = (props: DialogLanguageInfoFormProps) => {
  const { updateFilter } = useFilterFromUrl()
  const { defaultData, person_token } = props
  const { setIsDirty } = useFormStore()
  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [isAlertOpen, setIsAlertOpen] = useState(false) // Estado para controlar el AlertDialog

  const id_degree = defaultData?.id

  const form = useForm<AcademicLanguageType>({
    resolver: zodResolver(AcademicLanguageSchema),
    defaultValues: {
      ...defaultData,
      level: Number(defaultData?.level) || 1,
      person_token: person_token,
      institution: defaultData?.institution || '',
    },
  })

  const isDirty = form.formState.isDirty

  useEffect(() => {
    setIsDirty(isDirty)
  }, [isDirty])

  async function onSubmit(data: AcademicLanguageType) {
    setIsLoading(true)
    const dataForm = {
      ...data,
      file: data.file ? data?.file[0] : null,
    }

    const response = defaultData
      ? await createOrUpdateLanguagePerson(dataForm, id_degree)
      : await createOrUpdateLanguagePerson(dataForm)
    if (response.status === 201 || response.status === 200) {
      toast.success(
        <ToastCustom
          title="Éxito"
          description={`${response?.message}`}
        />
      )
      router.push(ADMISSION_URLS_APP.PROFILE.LANGUAGES)
      router.refresh()
      setIsLoading(false)
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
        <DialogContent className="sm:max-w-4xl">
          <DialogHeader>
            <DialogTitle>{TITLE}</DialogTitle>
            <DialogDescription>{DESCRIPTION}</DialogDescription>
          </DialogHeader>
          <p className="text-sm text-gray-500">{MESSAGE}</p>
          <Form {...form}>
            <form
              className="grid gap-4"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <ScrollArea className="h-[calc(100vh-200px)] grid gap-4 py-4">
                <div className="space-y-4 p-4">
                  {/* LANGUAGE INFO */}
                  <LanguageInfoSection />
                  {/* CERTIFICATE */}
                  <FileCertificateSection />
                </div>
              </ScrollArea>
              <DialogFooter>
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
      {/* AlertDialog */}
      <AlertDialogCustom
        open={isAlertOpen}
        title="Salir sin guardar"
        description="¿Estás seguro que deseas salir sin guardar los cambios?"
        handleConfirm={handleConfirmExit}
        handleCancel={handleCancelExit}
      />
      <LoadingAbsolute show={isLoading} />
    </>
  )
}
