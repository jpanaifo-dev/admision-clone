/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'react-toastify'
import { Loader, FileCheck } from 'lucide-react'
import * as z from 'zod'

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
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ToastCustom } from '@/components/app'
import { attachFileToRequirement } from '@/api/convocatory'
import { Badge } from '@/components/ui/badge'

import { IPersonFile, IUserAuth } from '@/types'
import { ScrollArea } from '@/components/ui/scroll-area'
import { FILES_TYPES } from '@/modules/files/constants/file_types'
import { Input } from '@/components/ui/input'
import { fetchPersonFiles } from '@/api/files'

// Define the schema for the form
const FileSelectionSchema = z.object({
  selectedFile: z.string().min(1, 'Debe seleccionar un archivo'),
})

type FileSelectionType = z.infer<typeof FileSelectionSchema>

interface FileSelectionModalProps {
  requirementId: number
  promotionConvocatoryId: number
  userAuth: IUserAuth
}

export const FileSelectionModal = (props: FileSelectionModalProps) => {
  const { requirementId, userAuth } = props

  const [isLoading, setIsLoading] = useState(false)
  const [filesRequired, setFilesRequired] = useState<IPersonFile[]>([])
  const [search, setSearch] = useState('')

  const form = useForm<FileSelectionType>({
    resolver: zodResolver(FileSelectionSchema),
    defaultValues: {},
  })

  const onSubmit = async (data: FileSelectionType) => {
    setIsLoading(true)
    const response = await attachFileToRequirement({
      evaluation_id: requirementId,
      url_file: data.selectedFile,
    })

    if (response.errors) {
      toast.error(
        <ToastCustom
          title="Error"
          description={`Error al seleccionar el archivo: ${response.errors.join(
            ', '
          )}`}
        />
      )
    } else {
      toast.success(
        <ToastCustom
          title="Éxito"
          description="Archivo seleccionado correctamente."
        />
      )
      setTimeout(() => {
        window.location.reload()
      }, 1000)
    }
    setIsLoading(false)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const filterFiles = (files: IPersonFile[], search: string) => {
    return files.filter((file) =>
      file.file.toLowerCase().includes(search.toLowerCase())
    )
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setFilesRequired(filterFiles(filesRequired, e.target.value))
  }

  useEffect(() => {
    const fetchFiles = async () => {
      const response = await fetchPersonFiles({
        is_active: true,
        person_token: userAuth?.person_token,
      })

      if (response.data) {
        setFilesRequired(response.data)
      }
    }

    fetchFiles()
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="border"
        >
          <FileCheck className="h-4 w-4 mr-2" /> Seleccionar archivo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-6xl">
        <DialogHeader>
          <DialogTitle>
            Seleccionar archivo para el requisito {requirementId}
          </DialogTitle>
          <DialogDescription>
            Seleccione el archivo requerido de acuerdo a las indicaciones de
            este requisito.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4"
          >
            <section>
              <Input
                type="search"
                placeholder="Buscar archivo ..."
                value={search}
                onChange={handleSearch}
                className="w-full max-w-md"
              />
            </section>
            <ScrollArea className="max-h-[400px]">
              <FormField
                control={form.control}
                name="selectedFile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Archivos disponibles</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="space-y-2 grid grid-cols-1 sm:grid-cols-2 gap-4"
                      >
                        {filesRequired.map((file) => (
                          <FormItem
                            className="flex items-center justify-between border rounded-md p-4 shadow-sm hover:shadow-md transition duration-200 bg-white border-l-5"
                            key={file.id}
                          >
                            <FormControl>
                              <RadioGroupItem value={file.file.toString()} />
                            </FormControl>

                            <div className="flex items-start flex-grow space-x-3">
                              <div className="flex flex-col items-start pl-3">
                                <div className="flex items-center gap-1 pb-1">
                                  <Badge
                                    className="text-xs px-2 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-800"
                                    variant={
                                      file.is_active ? 'default' : 'secondary'
                                    }
                                  >
                                    {
                                      FILES_TYPES.find(
                                        (type) => type.id === file.file_Type
                                      )?.title
                                    }
                                  </Badge>
                                </div>
                                <div>
                                  <span className="font-semibold text-gray-800">
                                    {file.file.split('/').pop()}
                                  </span>
                                  <div className="text-sm text-gray-500 mt-0.5">
                                    <span>
                                      Subido el: {formatDate(file.created_at)}
                                    </span>
                                    <span className="mx-1">•</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormDescription>
                      Seleccione uno de los archivos disponibles.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </ScrollArea>
            <DialogFooter>
              <Button
                type="submit"
                disabled={isLoading}
              >
                {isLoading && <Loader className="animate-spin mr-2" />}
                Seleccionar archivo
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
