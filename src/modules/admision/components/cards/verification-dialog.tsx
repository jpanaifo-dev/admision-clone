'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText } from 'lucide-react'
import { OTPInput, SlotProps } from 'input-otp'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { cn } from '@nextui-org/react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import Link from 'next/link'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'

export function VerificationDialog() {
  const router = useRouter()
  //   const searchParams = useSearchParams()
  const [code, setCode] = useState('')

  const [isLoading, setIsLoading] = useState(false)
  const handleCodeChange = async (value: string) => {
    setCode(value)
    if (value.length === 6) {
      // Simular validación
      setIsLoading(true)
      const isValid = validateCode(value)
      await new Promise((resolve) => setTimeout(resolve, 3000))
      if (isValid) {
        router.push('/sig-up/register')
      } else {
        alert('Código incorrecto, por favor verifica.')
      }
    }
    setIsLoading(false)
  }

  const validateCode = (code: string) => {
    // Simular validación del código (reemplazar con tu lógica real)
    return code === '123456'
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          size="sm"
          className="rounded-sm w-full py-2 bg-primary-500 textwhite font-medium hover:bg-primary-400"
        >
          Validar pago
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px] w-full flex flex-col justify-center items-center gap-8">
        <Card className="sm:max-w-[425px] w-full mx-auto border-none shadow-none p-0">
          <CardHeader className="px-0">
            <CardTitle className="text-xl font-semibold text-center">
              Verificar pago
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 p-0">
            <p className="text-sm text-center text-gray-600 w-full">
              Ingrese el código de pago para procesar la postulación
            </p>
            <div className="flex justify-center">
              <FileText className="w-14 h-14 text-gray-400" />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="paymentCode"
                className="text-sm font-medium"
              >
                Cód. boleta
              </label>
              <OTPInput
                id="input-58"
                containerClassName="flex items-center gap-2"
                maxLength={7}
                value={code}
                onChange={handleCodeChange}
                render={({ slots }) => (
                  <div className="flex gap-4">
                    {slots.map((slot, idx) => (
                      <Slot
                        key={idx}
                        {...slot}
                      />
                    ))}
                  </div>
                )}
              />
            </div>
          </CardContent>
        </Card>
        <AlertDialogFooter className="w-full flex flex-col md:flex-col gap-2 justify-center items-center">
          <AlertDialogAction
            className="w-full"
            disabled={isLoading}
            asChild
          >
            <Link href={ADMISSION_URLS_APP.APPLICATION.URL_BASE}>
              Continuar
            </Link>
          </AlertDialogAction>
          <AlertDialogCancel className="w-full">Cancelar</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        'flex w-10 h-10 items-center justify-center rounded-md border border-input bg-background font-medium text-foreground shadow-sm transition-shadow',
        { 'z-10 border-ring ring-2 ring-ring': props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  )
}
