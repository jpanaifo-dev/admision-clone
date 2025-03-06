'use client'

import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'
import { CalendarIcon, Loader } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { paymentValidateSchema } from './validate.pay.schemas'
import { validatePay } from '@/api/convocatory'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'
import { EmailValidate } from './email-validate'
import { emailAccessCode } from '@/api/auth'
import Image from 'next/image'
import { Steps } from './steps'
import { IPaymentValidation, IProgramBanner } from '@/types'
import { ProgramConfirm } from '../pages'
import Link from 'next/link'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'

const steps = [
  { title: 'Validar pago' },
  { title: 'Validar email' },
  { title: 'Confirmación' },
  { title: 'Subir documentos' },
]

export const PaymentValidateForm = ({
  email,
  programData,
  person_uuid,
  promotion_convocatory,
}: {
  email: string
  programData?: IProgramBanner | null
  person_uuid: string
  promotion_convocatory: number
}) => {
  const [currentStep, setCurrentStep] = useState(0)
  const [loading, setLoading] = useState(false)
  const [isResendDisabled, setIsResendDisabled] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [paymentValidate, setPaymentToken] = useState<IPaymentValidation | null>(null)

  const form = useForm<z.infer<typeof paymentValidateSchema>>({
    resolver: zodResolver(paymentValidateSchema),
    defaultValues: {
      document_number: '',
      operation_number: '',
      date: undefined,
    },
  })

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (isResendDisabled && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000)
    } else if (timeLeft === 0) {
      setIsResendDisabled(false)
    }
    return () => clearInterval(timer)
  }, [isResendDisabled, timeLeft])

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSendCode = async () => {
    if (!email) return
    const response = await emailAccessCode({
      email,
      action: 'payment-validate',
    })
    if (response.status === 200) {
      setIsResendDisabled(true)
      toast.success('Código enviado correctamente.')
      setTimeLeft(30)
    } else {
      toast.error('Error al enviar el código.')
    }
  }

  const handleValidatePayment = async (
    values: z.infer<typeof paymentValidateSchema>
  ) => {
    setLoading(true)
    const res = await validatePay(values)
    if (res.data) {
      setPaymentToken(res.data)
      toast.success(
        <ToastCustom
          title="Pago validado"
          description="El pago ha sido validado correctamente."
        />
      )
      await handleSendCode()
      handleNextStep()
    } else {
      toast.error(
        <ToastCustom
          title="Pago no validado"
          description={`Error al validar el pago: ${res.errors?.join(', ')}`}
        />
      )
    }
    setLoading(false)
  }

  return (
    <>
      <main className="flex flex-col items-center gap-6">
        <header className="w-max-2xl">
          <Steps
            currentStep={currentStep + 1}
            steps={steps}
          />
        </header>
        {currentStep === 0 && (
          <section className="flex flex-col items-center gap-6">
            <main className="w-full">
              <Tabs
                defaultValue="pagalo"
                className="w-full"
              >
                <TabsList className="w-full">
                  <TabsTrigger
                    className="w-full"
                    value="pagalo"
                  >
                    Págalo.pe
                  </TabsTrigger>
                  <TabsTrigger
                    className="w-full"
                    value="ventanilla"
                  >
                    Ventanilla
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="pagalo">
                  <div className="p-2 border rounded-md">
                    <Image
                      src="/images/pagalo.pe.png"
                      alt="Validar pago"
                      width={510}
                      height={300}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="ventanilla">
                  <div className="p-2 border rounded-md">
                    <Image
                      src="/images/recibo_bn.jpg"
                      alt="Validar pago"
                      width={510}
                      height={300}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </main>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleValidatePayment)}
                className="space-y-8 bg-white p-8 border rounded-lg max-w-lg w-full"
              >
                <header className="space-y-2">
                  <h2 className="text-2xl font-bold sm:text-3xl">
                    Validar Pago
                  </h2>
                  <p className="text-sm text-gray-600">
                    La manera más segura para validar tu pago y continuar con el
                    proceso
                  </p>
                </header>
                <FormField
                  control={form.control}
                  name="operation_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Código de Pago</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese el código de pago"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="date"
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>Fecha de Pago</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className="w-full flex items-start justify-between"
                            >
                              {field.value
                                ? format(field.value, 'dd/MM/yyyy')
                                : 'Seleccione una fecha'}
                              <CalendarIcon className="ml-2 h-4 w-4" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            disabled={(date) => date > new Date()}
                            locale={es}
                            className="w-ful"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="document_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>DNI</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Ingrese su DNI"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <footer>
                  <Button
                    type="submit"
                    className="w-full bg-primary-800"
                    disabled={loading}
                  >
                    {loading && (
                      <Loader className="mr-2 h-5 w-5 animate-spin" />
                    )}
                    Validar Pago
                  </Button>
                  <div className="w-full p-3 text-center">
                    <Link
                      href={ADMISSION_URLS_APP.HOME.URL_BASE}
                      className="text-primary-800 hover:underline w-full text-center text-sm"
                    >
                      Volver al inicio
                    </Link>
                  </div>
                </footer>
              </form>
            </Form>
          </section>
        )}
      </main>

      {currentStep === 1 && (
        <section className="flex flex-col items-center">
          <EmailValidate
            email={email}
            handleSendCode={handleSendCode}
            handleNextStep={handleNextStep}
            handlePreviousStep={handlePreviousStep}
          />
        </section>
      )}
      {currentStep === 2 && (
        <section className="flex flex-col items-center max-w-4xl">
          <ProgramConfirm
            payment_uuid={paymentValidate?.uuid ?? ''}
            person_uuid={person_uuid}
            promotion_convocatory={promotion_convocatory}
            programData={programData}
          />
        </section>
      )}
    </>
  )
}
