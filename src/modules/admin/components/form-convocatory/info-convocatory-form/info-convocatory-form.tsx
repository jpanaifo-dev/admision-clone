'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { format } from 'date-fns'
import { toast } from 'react-toastify'
import { IConvocatory } from '@/types/admission'
import { Button } from '@/components/ui/button'
import { Form } from '@/components/ui/form'
import { ConfirmationModal } from '@/components/app/alerts'
import { HeaderSection, ToastCustom } from '@/components/app'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  ConvocatoryCreateSchema,
  ConvocatoryCreateType,
  FooterForm,
} from '@/modules/admin'
import {
  ActionSection,
  BasicInfo,
  DateRangeSection,
  DocumentsSection,
} from './sections'
import { CONVOCATION_INFO_FORM } from './content-form'
import { ADMIN_URLS_APP } from '@/config/urls-data/admin.urls.config'
import { createOrUpdateConvocatory } from '@/api/convocatory'

const { CREATE, UPDATE } = CONVOCATION_INFO_FORM

interface BasicInfoStepProps {
  defaultValues?: IConvocatory
}

// Hook para prevenir la salida o recarga si hay cambios sin guardar
const usePreventLeave = (isDirty: boolean) => {
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isDirty) {
        e.preventDefault()
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  }, [isDirty])
}

export const InfoConvocatoryForm = ({ defaultValues }: BasicInfoStepProps) => {
  const isEditMode = Boolean(defaultValues)
  const [loading, setLoading] = useState<boolean>(false)
  const [continueStep, setContinueStep] = useState<boolean>(false)
  const [isSaveModalOpen, setIsSaveModalOpen] = useState<boolean>(false)
  const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false)
  const router = useRouter()
  const form = useForm<ConvocatoryCreateType>({
    resolver: zodResolver(ConvocatoryCreateSchema(isEditMode)),
    defaultValues: {
      description: defaultValues?.description || '',
      is_active: defaultValues?.is_active ?? true,
      end_date: defaultValues?.end_date
        ? format(new Date(defaultValues.end_date), 'yyyy-MM-dd')
        : '',
      start_date: defaultValues?.start_date
        ? format(new Date(defaultValues.start_date), 'yyyy-MM-dd')
        : '',
      is_public: defaultValues?.is_public ?? false,
      period_uuid: defaultValues?.period_uuid || '',
    },
  })

  const isDirty = form.formState.isDirty

  // Usar el hook para prevenir la salida o recarga
  usePreventLeave(isDirty)

  const handleSave = async (values: ConvocatoryCreateType) => {
    setLoading(true)
    try {
      const response = defaultValues
        ? await createOrUpdateConvocatory(values, Number(defaultValues.id))
        : await createOrUpdateConvocatory(values)
      if (response.status === 201 || response.status === 200) {
        toast.success(
          <ToastCustom
            title="Éxito"
            description={`${response?.data?.description} ha sido
                ${isEditMode ? 'actualizada' : 'creada'}
              exitosamente.`}
          />
        )
        form.reset()
        router.push(
          !continueStep
            ? ADMIN_URLS_APP.CONVOCATORIES.URL_BASE
            : ADMIN_URLS_APP.CONVOCATORIES.CONVOCATORY_TIMELINE(
                response?.data?.uuid as string
              )
        )
      } else {
        toast.error(
          <ToastCustom
            title="Error"
            description={`${response?.errors}`}
          />
        )
      }
    } catch (error) {
      console.error('Error al guardar la convocatoria:', error)
      toast.error('Error al guardar la convocatoria.')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitWithConfirmation = (values: ConvocatoryCreateType) => {
    if (isDirty) {
      setIsSaveModalOpen(true) // Mostrar modal de guardar si hay cambios sin guardar
    } else {
      handleSave(values) // Guardar directamente si no hay cambios
    }
  }

  const handleCancel = () => {
    if (isDirty) {
      setIsCancelModalOpen(true) // Mostrar modal de cancelar si hay cambios sin guardar
    } else {
      router.push(ADMIN_URLS_APP.CONVOCATORIES.URL_BASE) // Redirigir si no hay cambios
    }
  }

  return (
    <>
      <HeaderSection
        title={isEditMode ? UPDATE.title : CREATE.title}
        description={isEditMode ? UPDATE.description : CREATE.description}
        disabledActions
      />
      <Form {...form}>
        <section className="flex flex-col gap-8 pb-16 pt-1 pr-1">
          <form
            onSubmit={form.handleSubmit(handleSubmitWithConfirmation)}
            className="flex flex-col gap-8"
          >
            <BasicInfo />
            <hr className="border-t-1 border-solid border-gray-300" />
            <DateRangeSection />
            <hr className="border-t-1 border-solid border-gray-300" />
            <DocumentsSection />
            <hr className="border-t-1 border-solid border-gray-300" />
            <ActionSection />
            <FooterForm>
              <div className="flex items-center justify-between w-full max-w-5xl px-4 py-2">
                <Button
                  variant="outline"
                  type="button"
                  onClick={handleCancel} // Usar handleCancel en lugar de form.reset()
                >
                  Cancelar
                </Button>
                <div className="flex items-center space-x-4">
                  <Button
                    type="button"
                    disabled={loading || !isDirty}
                    onClick={() => {
                      setContinueStep(true)
                      form.handleSubmit(handleSubmitWithConfirmation)()
                    }}
                    variant="outline"
                  >
                    {loading ? (
                      <div className="flex justify-center items-center space-x-2">
                        <div className="w-4 h-4 border-t-2 border-blue-500 border-solid rounded-full animate-spin" />
                        <span>Procesando...</span>
                      </div>
                    ) : isEditMode ? (
                      UPDATE.buttonContinue
                    ) : (
                      CREATE.buttonContinue
                    )}
                  </Button>
                  <Button
                    type="button"
                    disabled={loading || !isDirty}
                    onClick={() => {
                      setContinueStep(false)
                      form.handleSubmit(handleSubmitWithConfirmation)()
                    }}
                  >
                    {loading ? (
                      <div className="flex justify-center items-center space-x-2">
                        <div className="w-4 h-4 border-t-2 border-blue-500 border-solid rounded-full animate-spin" />
                        <span>Procesando...</span>
                      </div>
                    ) : isEditMode ? (
                      UPDATE.button
                    ) : (
                      CREATE.button
                    )}
                  </Button>
                </div>
              </div>
            </FooterForm>
          </form>
        </section>
      </Form>
      {/* Modal de Confirmación para Guardar */}
      <ConfirmationModal
        open={isSaveModalOpen}
        onOpenChange={setIsSaveModalOpen}
        title="¿Guardar cambios?"
        description="¿Deseas guardar los cambios realizados?"
        handleConfirm={() => {
          setIsSaveModalOpen(false)
          form.handleSubmit(handleSave)()
        }}
        handleCancel={() => setIsSaveModalOpen(false)}
      />
      {/* Modal de Confirmación para Cancelar */}
      <ConfirmationModal
        open={isCancelModalOpen}
        onOpenChange={setIsCancelModalOpen}
        title="¿Descartar cambios?"
        description="Tienes cambios sin guardar. ¿Estás seguro de que deseas descartarlos?"
        handleConfirm={() => {
          setIsCancelModalOpen(false)
          router.push(ADMIN_URLS_APP.CONVOCATORIES.URL_BASE) // Redirigir después de confirmar
        }}
        handleCancel={() => setIsCancelModalOpen(false)} // Cerrar modal sin cancelar
      />
    </>
  )
}
