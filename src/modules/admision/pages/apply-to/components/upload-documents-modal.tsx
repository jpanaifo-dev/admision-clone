'use client'
import { DropzoneCustom, ToastCustom } from '@/components/app'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Loader, Upload } from 'lucide-react'
import { updateEvaluation } from '@/api/convocatory'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import {
  EvaluationFormSchema,
  EvaluationType,
} from '@/modules/admision/schemas'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useState } from 'react'

interface UploadDocumentsModalProps {
  requirementId: number
  applicationId: number
  promotionConvocatoryId: number
}

export const UploadDocumentsModal = (props: UploadDocumentsModalProps) => {
  const { requirementId, applicationId, promotionConvocatoryId } = props

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<EvaluationType>({
    resolver: zodResolver(EvaluationFormSchema),
    defaultValues: {},
  })

  const onSubmit = async (data: EvaluationType) => {
    setIsLoading(true)
    const response = await updateEvaluation(requirementId, {
      promotion_convocatory_requirement: promotionConvocatoryId,
      applicant_file: applicationId,
      requeriment_file: data.requeriment_file,
    })

    if (response.errors) {
      toast.error(
        <ToastCustom
          title="Error"
          description={`Error al subir los documentos: ${response.errors.join(
            ','
          )}`}
        />
      )
    } else {
      toast.success(
        <ToastCustom
          title="Éxito"
          description="Documento subido correctamente."
        />
      )
      setTimeout(() => {
        window.location.reload()
      }, 1000)
      window.location.reload()
    }
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="border"
        >
          <Upload className="h-4 w-4" /> Subir un archivo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>
            Subir documento {''}
            {requirementId}
          </DialogTitle>
          <DialogDescription>
            Sube el documento requerido de acuerdo a las indicaciones de este
            requisito.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="requeriment_file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Archivo</FormLabel>
                  <FormControl>
                    <DropzoneCustom
                      onDrop={(acceptedFiles) => {
                        if (acceptedFiles.length > 0) {
                          field.onChange(acceptedFiles[0]) // Asigna el archivo al campo
                        }
                      }}
                      maxFiles={1}
                      accept={{
                        'application/pdf': ['.pdf'],
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Solo se aceptan archivos en formato PDF.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader className="animate-spin" />}
                Subir documento
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
