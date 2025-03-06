'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FILES_TYPES } from '../../constants/file_types'
import { DropzoneCustom, ToastCustom } from '@/components/app'
import { Loader, Plus } from 'lucide-react'
import { filePersonSchema } from '../../schemas'
import { IPersonFileRequirements, IUserAuth } from '@/types'
import { uploapFilesPerson } from '@/api/files/upload-files'
import { toast } from 'react-toastify'
import Image from 'next/image'

type FormValues = z.infer<typeof filePersonSchema>

interface FileUploadModalProps {
  userAuth: IUserAuth
  filePendingSelected: IPersonFileRequirements
}

export const FileUploadModal = (props: FileUploadModalProps) => {
  const { userAuth, filePendingSelected } = props

  const [open, setOpen] = useState(false)
  const [isUploading, setIsUploading] = useState(false)

  const file_type_id =
    filePendingSelected?.requirement?.requirement_type || null

  const fileTypeSelected = FILES_TYPES.find(
    (fileType) => fileType.id === file_type_id
  )

  const form = useForm<FormValues>({
    resolver: zodResolver(filePersonSchema),
    defaultValues: {
      file: undefined,
      file_Type: file_type_id || null,
      is_active: true,
      requirement: filePendingSelected?.requirement?.id || null,
      person_token: userAuth?.person_token,
    },
  })

  async function onSubmit(values: FormValues) {
    setIsUploading(true)
    const isFile = filePendingSelected?.file ? true : false
    const id_file = isFile ? filePendingSelected?.file?.id.toString() : null
    const response = await uploapFilesPerson(values, id_file)
    if (response.data) {
      toast.success(
        <ToastCustom
          title="Archivo subido"
          description="El archivo se ha subido correctamente."
        />
      )
      setOpen(false)
      window.location.reload()
    } else {
      toast.error(
        <ToastCustom
          title="Error al subir archivo"
          description={
            response?.errors?.join(', ') || 'Error al subir archivo.'
          }
        />
      )
    }
    setTimeout(() => {
      setIsUploading(false)
    }, 3000)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <section className="flex flex-col items-center space-y-4 p-2">
          <Image
            src="/svg/upload.svg"
            alt="Subir archivo"
            width={280}
            height={320}
          />
          {filePendingSelected?.file && (
            <section className="flex flex-col items-center space-y-1 text-center">
              <h3 className="text-2xl font-extrabold">¡Ten en cuenta esto!</h3>
              <p>Si sube un archivo este reemplazará el archivo actual.</p>
            </section>
          )}
          <Button size="sm">
            <Plus className="w-6 h-6 " />
            {filePendingSelected?.file ? 'Actualizar archivo' : 'Subir archivo'}
          </Button>
        </section>
      </DialogTrigger>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            Subir archivo
            {fileTypeSelected?.name ? ` - ${fileTypeSelected?.name}` : ''}
          </DialogTitle>
          <DialogDescription>
            Sube un archivo para la categoría seleccionada.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <FormField
              control={form.control}
              name="file"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>File</FormLabel>
                  <FormControl>
                    <DropzoneCustom
                      accept={{
                        file: ['application/pdf'],
                      }}
                      onDrop={(files) => {
                        field.onChange(files[0])
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Seleccione un archivo para subir.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              disabled={isUploading}
            >
              {isUploading && <Loader className="w-6 h-6 mr-2 animate-spin" />}
              {isUploading ? 'Subiendo archivo...' : 'Subir archivo'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
