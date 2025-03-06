'use client'

import * as React from 'react'
import {
  HeaderSection,
  SpinnerLoadingScreen,
  StageInput,
} from '@/components/app'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useForm } from 'react-hook-form'
import { IConvocatory } from '@/types/admission'
import { Button } from '@/components/ui/button'
import { format, parseISO } from 'date-fns'
import { toast } from 'react-toastify'
import Link from 'next/link'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { CalendarIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Calendar } from '@/components/ui/calendar'
import { es } from 'date-fns/locale'
// import { useRouter } from "next/navigation";
import {
  ConvocatoryCreateSchema,
  ConvocatoryCreateType,
} from '@/modules/admision/schemas/convocatory.file.create.schema'
// import { createOrUpdateConvocatory } from "@/api/convocatory/convocatory.admin.create";
import { useState } from 'react'
// import { ExternalLinkButton } from '@/modules/admision/pages/convocatory/details-admission-components/components/external-link'

interface BasicInfoStepProps {
  defaultValues?: IConvocatory[] | undefined
}

export default function BasicInfoStep({ defaultValues }: BasicInfoStepProps) {
  const isEditMode = Boolean(defaultValues && defaultValues.length > 0)
  const initialData = isEditMode ? defaultValues?.[0] : undefined
  // const router = useRouter();
  // const [showFileInput, setShowFileInput] = useState(false)
  const [loading, setLoading] = useState(false)

  const form = useForm<ConvocatoryCreateType>({
    resolver: zodResolver(ConvocatoryCreateSchema(isEditMode)),
    defaultValues: {
      description: initialData?.description || '',
      start_date: initialData
        ? parseISO(initialData.start_date.toString())
        : new Date(),
      end_date: initialData
        ? parseISO(initialData.end_date.toString())
        : new Date(),
      is_active: initialData?.is_active ?? true,
    },
  })

  async function onSubmit() {
    setLoading(true)
    try {
      // const requestData = {
      //   ...values,
      //   start_date: format(values.start_date, "yyyy-MM-dd"),
      //   end_date: format(values.end_date, "yyyy-MM-dd"),
      //   regulation: values.regulation ? values.regulation[0] : null,
      // };
      // const response = defaultValues
      //   ? await createOrUpdateConvocatory(
      //       requestData,
      //       Number(defaultValues[0].id)
      //     )
      //   : await createOrUpdateConvocatory(requestData);
      // if (response.status === 201 || response.status === 200) {
      //   toast.success(
      //     <ToastCustom
      //       title="Éxito"
      //       description={`${response?.data?.description} ha sido
      //         ${isEditMode ? "actualizada" : "creada"}
      //       exitosamente.`}
      //     />
      //   );
      //   form.reset();
      //   router.push(
      //     defaultValues
      //       ? "/admin/convocatorias"
      //       : `/admin/convocatorias/${response?.data?.uuid}/cronograma`
      //   );
      // } else {
      //   toast.error(
      //     <ToastCustom title="Error" description={`${response?.errors}`} />
      //   );
      // }
    } catch (error) {
      console.error('Error al guardar la convocatoria:', error)
      toast.error('Error al guardar la convocatoria.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <HeaderSection
        title={isEditMode ? 'Editar Convocatoria' : 'Crear Nueva Convocatoria'}
        description={
          isEditMode
            ? 'Modifique la información de la convocatoria existente.'
            : 'Rellene la información para crear una nueva convocatoria.'
        }
        disabledActions
      />
      <Form {...form}>
        <section className="flex flex-col gap-8 overflow-y-auto sm:h-screen md:h-full pb-16 pt-1 pr-1">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-8"
          >
            <StageInput
              label="Etapa"
              description={`Ingrese el nombre de la etapa de la convocatoria`}
              input={
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Ejemplo: Etapa de inscripción"
                          type="text"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              }
            />
            <StageInput
              label="Fecha de inicio"
              description="Seleccione la fecha de inicio de la convocatoria"
              input={
                <FormField
                  control={form.control}
                  name="start_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'dd/MM/yyyy', {
                                  locale: es,
                                })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              }
            />
            <StageInput
              label="Fecha de fin"
              description="Seleccione la fecha de fin de la convocatoria"
              input={
                <FormField
                  control={form.control}
                  name="end_date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'w-full pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? (
                                format(field.value, 'dd/MM/yyyy', {
                                  locale: es,
                                })
                              ) : (
                                <span>Selecciona una fecha</span>
                              )}
                              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent
                          className="w-auto p-0"
                          align="start"
                        >
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              }
            />

            <StageInput
              label="Público"
              description="Seleccione si la convocatoria es visible para el público"
              input={
                <Select
                  defaultValue={form.watch('is_active') ? 'Publico' : 'Privado'}
                  onValueChange={(value) =>
                    form.setValue('is_active', value === 'Publico')
                  }
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder={
                        form.watch('is_active') || 'Seleccione una opción'
                      }
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Publico">Público</SelectItem>
                    <SelectItem value="Privado">Privado</SelectItem>
                  </SelectContent>
                </Select>
              }
            />

            <StageInput
              label="Reglamento"
              description="Adjunte el reglamento de la convocatoria"
              // input={
              //   isEditMode ? (
              //     <div className="flex flex-col gap-2">
              //       {initialData?.regulation ? (
              //         <ExternalLinkButton
              //           label="Ver documento"
              //           href={initialData.regulation}
              //           blank
              //         />
              //       ) : (
              //         <span>No hay reglamento adjunto</span>
              //       )}
              //       <Button
              //         type="button"
              //         variant="outline"
              //         onClick={() => setShowFileInput(!showFileInput)}
              //       >
              //         {showFileInput ? 'Ocultar' : 'Cambiar Reglamento'}
              //       </Button>
              //       {showFileInput && (
              //         <FormField
              //           control={form.control}
              //           name="regulation"
              //           render={({ field: { onChange } }) => (
              //             <FormItem>
              //               <FormControl>
              //                 <DropzoneCustom
              //                   className="w-full h-16"
              //                   onDrop={(files) => {
              //                     onChange(files)
              //                   }}
              //                   accept={{
              //                     'application/pdf': ['.pdf'],
              //                   }}
              //                 />
              //               </FormControl>
              //               <FormMessage />
              //             </FormItem>
              //           )}
              //         />
              //       )}
              //     </div>
              //   ) : (
              //     <FormField
              //       control={form.control}
              //       name="regulation"
              //       render={({ field: { onChange } }) => (
              //         <FormItem>
              //           <FormControl>
              //             <DropzoneCustom
              //               className="w-full h-16"
              //               onDrop={(files) => {
              //                 onChange(files)
              //               }}
              //               accept={{
              //                 'application/pdf': ['.pdf'],
              //               }}
              //               maxSizeFile={2}
              //             />
              //           </FormControl>
              //           <FormMessage />
              //         </FormItem>
              //       )}
              //     />
              //   )
              // }
            />

            <footer className="fixed bottom-0 w-full flex right-0 justify-center bg-white shadow-lg border-t-1">
              <div className="flex justify-end py-4 gap-4 w-full px-4 md:px-8 lg:px-16 xl:px-28">
                <Link href="/admin/convocatorias">
                  <Button
                    variant="outline"
                    type="button"
                  >
                    Cancelar
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={loading || !form.formState.isValid}
                >
                  {loading ? (
                    <div className="flex justify-center items-center space-x-2">
                      <div className="w-4 h-4 border-t-2 border-blue-500 border-solid rounded-full animate-spin" />
                      <span>Procesando...</span>
                    </div>
                  ) : isEditMode ? (
                    'Actualizar'
                  ) : (
                    'Guardar'
                  )}
                </Button>
              </div>
            </footer>
          </form>
        </section>
      </Form>

      {loading && <SpinnerLoadingScreen />}
    </>
  )
}
