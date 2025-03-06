'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { IProgramBanner } from '@/types'
import { saveApplicantFileList } from '@/api/convocatory'
import { useAdmisionModalities } from '@/modules/admision/hooks'
import { ApplicantListFormSchema, ApplicantFileList } from '@/modules/admision'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'
import { usePathname, useRouter } from 'next/navigation'

interface ProgramConfirmProps {
  programData?: IProgramBanner | null
  person_uuid: string
  payment_uuid: string
  promotion_convocatory: number
}

export const ProgramConfirm = (props: ProgramConfirmProps) => {
  const { programData, payment_uuid, person_uuid, promotion_convocatory } =
    props
  const { admissionModalities } = useAdmisionModalities()
  const [showConfirmDialog, setShowConfirmDialog] = useState(false)

  const form = useForm<ApplicantFileList>({
    resolver: zodResolver(ApplicantListFormSchema),
    defaultValues: {
      person_uuid: person_uuid,
      payment_uuid: payment_uuid,
      promotion_convocatory: promotion_convocatory,
      admission_modality: admissionModalities?.[0]?.id,
    },
  })

  const router = useRouter()
  const pathname = usePathname()

  const onSubmit = async (data: ApplicantFileList) => {
    try {
      setShowConfirmDialog(false)
      const response = await saveApplicantFileList(data) // API call
      if (response?.data) {
        toast.success(
          <ToastCustom
            title="Postulación confirmada"
            description="Tu postulación ha sido confirmada con éxito."
          />
        )
        const NEW_PATH = pathname.split('/').slice(0, -1).join('/')
        router.push(`${NEW_PATH}/${response?.data?.id}`)
      } else {
        toast.error(
          <ToastCustom
            title="Error al confirmar postulación"
            description="Ocurrió un error al confirmar tu postulación. Por favor, intenta nuevamente."
          />
        )
      }
    } catch (error) {
      console.error('Error al guardar los datos:', error)
      toast.error(
        <ToastCustom
          title="Error al confirmar postulación"
          description="Ocurrió un error al confirmar tu postulación. Por favor, intenta nuevamente."
        />
      )
    }
  }

  const {
    program,
    class_start_date,
    cost_quota,
    quotas,
    headquarter,
    modality,
    months_duration,
    vacancies,
  } = programData || {}

  const total_cost = (cost_quota ?? 0) * (quotas ?? 0)

  function formatCurrency(value: number) {
    return new Intl.NumberFormat('es-PE', {
      style: 'currency',
      currency: 'PEN',
    }).format(value)
  }

  function reloadPage() {
    window.location.reload()
  }

  return (
    <main className="w-full grid grid-cols-1 gap-4 min-w-4xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(() => setShowConfirmDialog(true))}
          className="flex flex-col gap-4 w-full"
        >
          <section>
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-sm">
              <p className="text-yellow-700 font-medium">
                <span className="font-bold">IMPORTANTE: </span>
                Al confirmar esta postulación, tu pago se validará únicamente
                para este programa y no podrá ser modificado posteriormente.
              </p>
            </div>
          </section>
          {/* Detalles del programa */}
          <section className="space-y-4 border-1.5 rounded-lg p-4 lg:p-6 bg-gray-50 border-gray-400 w-full">
            <header className="flex flex-col gap-1 w-full">
              <h2 className="font-semibold text-gray-700 text-sm">
                Detalles del Programa
              </h2>
              <h1 className="text-xl font-extrabold">{program?.name}</h1>
              <p className="text-gray-800 text-sm">
                Plan de estudios:{' '}
                <span className="text-gray-600">
                  {program?.study_plan?.description}
                </span>
              </p>
            </header>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 w-full">
              <li className="text-gray-800">
                <span className="font-semibold">Inicio:</span>{' '}
                <span className="text-gray-600">{class_start_date}</span>
              </li>
              <li className="text-gray-800">
                <span className="font-semibold">Sede:</span>{' '}
                <span className="text-gray-600">{headquarter?.name}</span>
              </li>
              <li className="text-gray-800">
                <span className="font-semibold">Duración:</span>{' '}
                <span className="text-gray-600">{months_duration} meses</span>
              </li>
              <li className="text-gray-800">
                <span className="font-semibold">Vacantes:</span>{' '}
                <span className="text-gray-600">{vacancies}</span>
              </li>
              <li className="text-gray-800">
                <span className="font-semibold">Inversión Total:</span>{' '}
                <span className="text-gray-600">
                  {formatCurrency(total_cost)}
                </span>
              </li>
              <li className="text-gray-800">
                <span className="font-semibold">Modalidad:</span>{' '}
                <span className="text-gray-600">{modality}</span>
              </li>
            </ul>
          </section>

          {/* Formulario */}
          <section className="flex flex-col gap-4 p-4 lg:p-6 border-1.5 rounded-lg bg-gray-50 border-gray-400 w-full">
            <header>
              <h2 className="font-semibold">Tipo de postulación</h2>
              <p className="text-gray-800 text-sm">
                Selecciona el tipo de postulación que deseas realizar.
              </p>
            </header>
            <FormField
              control={form.control}
              name="admission_modality"
              render={({ field: { value, onChange } }) => (
                <FormItem>
                  <FormControl>
                    <RadioGroup
                      className="flex flex-wrap gap-2"
                      onValueChange={(value) => onChange(Number(value))}
                      defaultValue={
                        value
                          ? value.toString()
                          : admissionModalities?.[0]?.id.toString() ?? ''
                      }
                    >
                      {admissionModalities?.map((item) => (
                        <div
                          key={`${item.id}`}
                          className="relative flex flex-col items-start gap-4 rounded-lg border border-input p-3 shadow-sm shadow-black/5"
                        >
                          <div className="flex items-center gap-2">
                            <RadioGroupItem
                              id={item.id.toString()}
                              value={item.id.toString()}
                              className="after:absolute after:inset-0"
                            />
                            <FormLabel htmlFor={`$${item.id}`}>
                              {item.name}
                            </FormLabel>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </section>

          <footer className="grid grid-cols-2 gap-4 mt-4">
            <Button
              variant="outline"
              type="button"
              onClick={reloadPage}
            >
              Cancelar proceso
            </Button>
            <Button
              className="bg-primary-800"
              type="submit"
            >
              Continuar
            </Button>
          </footer>
        </form>
      </Form>
      {/* Confirmación */}
      <Dialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar postulación</DialogTitle>
          </DialogHeader>
          <p className="text-gray-800">
            ¿Estás seguro de que deseas confirmar esta postulación? No podrás
            modificarla después.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowConfirmDialog(false)}
            >
              Cancelar
            </Button>
            <Button
              className="bg-primary-800"
              onClick={form.handleSubmit(onSubmit)}
            >
              Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  )
}
