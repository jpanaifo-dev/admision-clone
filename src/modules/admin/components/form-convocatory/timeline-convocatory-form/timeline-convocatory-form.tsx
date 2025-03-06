'use client'
import { ConfirmationModal, HeaderSection, ToastCustom } from '@/components/app'
import { Button } from '@/components/ui/button'
import { Minus, Plus } from 'lucide-react'
import { useForm, useFieldArray } from 'react-hook-form'
import { es } from 'date-fns/locale'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { format, parseISO } from 'date-fns'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar } from '@/components/ui/calendar'
import { zodResolver } from '@hookform/resolvers/zod'
import { IEventCall } from '@/types/admission'
import { IConvocatory } from '@/types'
import { useState } from 'react'
import { updateEventCallBulk, deleteEventCall } from '@/api/convocatory'

import { toast } from 'react-toastify'
import { CreateTimelineSchema, CreateTimelineType } from '@/modules/admin'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Checkbox } from '@/components/ui/checkbox'
import { FooterForm } from '@/modules/admin/layouts'
import { ADMIN_URLS_APP } from '@/config/urls-data/admin.urls.config'
import { useRouter } from 'next/navigation'

interface IProps {
  convocatory?: IConvocatory
  defaultValues?: IEventCall[] | undefined
}

export const TimelineConvocatoryForm = ({
  convocatory,
  defaultValues,
}: IProps) => {
  const [loading, setLoading] = useState(false)
  const [isDelete, setIsDelete] = useState(false)
  const [idDelete, setIdDelete] = useState<string | null>(null)

  const router = useRouter()
  const form = useForm<CreateTimelineType>({
    resolver: zodResolver(CreateTimelineSchema),
    defaultValues: {
      rows: defaultValues
        ? defaultValues.map((event) => ({
            id: event.id,
            name: event.name,
            start_date: parseISO(event.start_date.toString()),
            end_date: parseISO(event.end_date.toString()),
            is_active: event.is_active,
            convocatory: event.convocatory.toString(),
            is_inscription: event.is_inscription,
          }))
        : [],
    },
  })

  const isDirty = form.formState.isDirty
  const isLoad = form.formState.isSubmitting

  const { fields, append } = useFieldArray({
    control: form.control,
    name: 'rows',
  })

  const onSubmit = async (values: CreateTimelineType) => {
    setLoading(true)

    try {
      const response = await updateEventCallBulk(
        values,
        ADMIN_URLS_APP.CONVOCATORIES.CONVOCATORY_TIMELINE(
          convocatory?.uuid || ''
        )
      )

      if (response.status === 200 && response.data) {
        toast.success(
          <ToastCustom
            title="Eventos actualizados"
            description="Los eventos se han actualizado correctamente."
          />
        )
        window.location.reload()
      } else {
        toast.error(
          <ToastCustom
            title="Error al actualizar eventos"
            description="No se pudieron actualizar los eventos."
          />
        )
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error)
      toast.error('Error al conectar con el servidor.')
    }
    setLoading(false)
  }

  const onDelete = async (id: string) => {
    setLoading(true)

    try {
      const response = await deleteEventCall(
        id,
        ADMIN_URLS_APP.CONVOCATORIES.CONVOCATORY_TIMELINE(
          convocatory?.uuid || ''
        )
      )

      if (response.status === 204) {
        toast.success(
          <ToastCustom
            title="Evento eliminado"
            description="El evento se ha eliminado correctamente."
          />
        )
        window.location.reload()
      } else {
        toast.error(
          <ToastCustom
            title="Error al eliminar evento"
            description="No se pudo eliminar el evento."
          />
        )
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error)
      toast.error('Error al conectar con el servidor.')
    }
  }

  const formatDateRange = (startDate: Date, endDate: Date) => {
    if (startDate.getTime() === endDate.getTime()) {
      return format(startDate, "d 'de' MMMM 'de' yyyy", { locale: es })
    }
    return `${format(startDate, "d 'de' MMMM 'de' yyyy", {
      locale: es,
    })} — ${format(endDate, "d 'de' MMMM 'de' yyyy", { locale: es })}`
  }

  const addEvent = () => {
    append({
      is_active: true,
      name: '',
      start_date: new Date(),
      end_date: new Date(new Date().setDate(new Date().getDate() + 1)),
      is_inscription: false,
      convocatory: convocatory?.id.toString() || '',
    })
  }

  return (
    <>
      <HeaderSection
        title={`Cronograma de la convocatoria ${convocatory?.description}`}
        description="Crea los eventos que se llevarán a cabo durante la convocatoria."
        disabledActions
      />
      <section>
        <Button
          size="sm"
          variant="ghost"
          onClick={addEvent}
          disabled={loading}
        >
          <Plus />
          Agregar evento
        </Button>
      </section>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Table className="border border-gray-300 border-collapse bg-white rounded-lg">
            <TableHeader className="sticky top-0 bg-white z-10">
              <TableRow className="border border-gray-300">
                <TableHead className="border border-gray-300">Nombre</TableHead>
                <TableHead className="border border-gray-300">Fecha</TableHead>
                <TableHead className="border border-gray-300">
                  Público
                </TableHead>
                <TableHead className="border border-gray-300">
                  F. de inscripción
                </TableHead>
                <TableHead className="border border-gray-300">Acción</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <TableRow
                  key={field.id}
                  className="border border-gray-300"
                >
                  <TableCell className="border border-gray-300">
                    <FormField
                      control={form.control}
                      name={`rows.${index}.name`}
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <textarea
                              className="p-2 w-full text-sm md:min-w-[360px] font-semibold"
                              placeholder='Ejemplo: "Publicación de resultados"'
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <Popover>
                      <PopoverTrigger className="text-sm text-gray-600 text-start">
                        <div className="flex flex-col gap-1">
                          {formatDateRange(
                            form.watch('rows')[index].start_date,
                            form.watch('rows')[index].end_date
                          )}
                          {form.formState.errors.rows?.[index]?.start_date && (
                            <span className="text-red-500 text-xs">
                              {
                                form.formState.errors.rows[index].start_date
                                  .message
                              }
                            </span>
                          )}
                          {form.formState.errors.rows?.[index]?.end_date && (
                            <span className="text-red-500 text-xs">
                              {
                                form.formState.errors.rows[index].end_date
                                  .message
                              }
                            </span>
                          )}
                        </div>
                      </PopoverTrigger>
                      <PopoverContent className="w-full">
                        <div>
                          <header className="grid grid-cols-2 gap-4 items-center p-2">
                            <input
                              id="start_date"
                              type="date"
                              onChange={(e) => {
                                form.setValue(
                                  `rows.${index}.start_date`,
                                  parseISO(e.target.value)
                                )
                              }}
                              value={format(
                                form.getValues('rows')[index].start_date,
                                'yyyy-MM-dd'
                              )}
                              className="p-2 rounded-md border border-gray-300"
                            />
                            <input
                              type="date"
                              id="end_date"
                              onChange={(e) => {
                                form.setValue(
                                  `rows.${index}.end_date`,
                                  parseISO(e.target.value)
                                )
                              }}
                              className="p-2 rounded-md border border-gray-300"
                              value={format(
                                form.getValues('rows')[index].end_date,
                                'yyyy-MM-dd'
                              )}
                            />
                          </header>
                          <Calendar
                            initialFocus
                            mode="range"
                            locale={es}
                            numberOfMonths={2}
                            selected={{
                              from: form.watch('rows')[index].start_date,
                              to: form.watch('rows')[index].end_date,
                            }}
                            onSelect={(range) => {
                              if (range?.from && range?.to) {
                                form.setValue(
                                  `rows.${index}.start_date`,
                                  range.from
                                )
                                form.setValue(
                                  `rows.${index}.end_date`,
                                  range.to
                                )
                              }
                            }}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <FormField
                      control={form.control}
                      name={`rows.${index}.is_active`}
                      render={({ field }) => (
                        <div className="relative">
                          <select
                            className={`w-full appearance-none rounded-md border px-3 py-1 pr-8 text-xs font-medium border-gray-300
                    ${
                      field.value
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                            onChange={(e) =>
                              field.onChange(e.target.value === 'true')
                            }
                            value={field.value ? 'true' : 'false'}
                          >
                            <option value="true">✅ Activo</option>
                            <option value="false">❌ Inactivo</option>
                          </select>
                          <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                            ⏷
                          </div>
                        </div>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <FormField
                      control={form.control}
                      name={`rows.${index}.is_inscription`}
                      render={({ field }) => (
                        <div className="flex items-center space-x-2 text-center justify-center">
                          <Checkbox
                            id={`is_inscription_${index}`}
                            checked={field.value}
                            onCheckedChange={(e) => {
                              form.setValue(
                                'rows',
                                form.getValues('rows').map((row, i) => ({
                                  ...row,
                                  is_inscription: i === index ? e : false,
                                })) as CreateTimelineType['rows']
                              )
                            }}
                          />
                          <label
                            htmlFor={`is_inscription_${index}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            Sí
                          </label>
                        </div>
                      )}
                    />
                  </TableCell>
                  <TableCell className="border border-gray-300">
                    <Button
                      size="icon"
                      variant="ghost"
                      type="button"
                      onClick={() => {
                        setIdDelete(String(form.getValues('rows')[index].id))
                        setIsDelete(true)
                      }}
                    >
                      <Minus />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <FooterForm>
            <Button
              type="reset"
              variant="ghost"
              onClick={() => {
                form.reset()
                router.push(ADMIN_URLS_APP.CONVOCATORIES.URL_BASE)
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              disabled={loading || isLoad || !isDirty}
            >
              Guardar
            </Button>
          </FooterForm>
        </form>
      </Form>
      <div className="pb-14" />
      {/* Modal de Confirmación para Cancelar */}
      <ConfirmationModal
        open={isDelete}
        onOpenChange={setIsDelete}
        title="¿Eliminar evento?"
        description="¿Estás seguro de que deseas eliminar este evento?"
        handleCancel={() => {
          setIsDelete(false)
        }}
        handleConfirm={() => {
          if (idDelete) {
            onDelete(idDelete)
          }
        }}
        isDanger
      />
    </>
  )
}
