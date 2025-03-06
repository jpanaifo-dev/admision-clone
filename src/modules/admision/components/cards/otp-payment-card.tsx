import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { FileText } from 'lucide-react'

export default function OTPPaymentCard() {
  return (
    <Card className="w-full max-w-md mx-auto border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-center">
          Verificar pago
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-center text-gray-600">
          Ingrese el código de pago para procesar la postulación
        </p>
        <div className="flex justify-center">
          <FileText className="w-16 h-16 text-gray-400" />
        </div>
        <div className="space-y-2">
          <label
            htmlFor="paymentCode"
            className="text-sm font-medium"
          >
            Cód. boleta
          </label>
          <Input
            id="paymentCode"
            placeholder="Ingrese el código"
          />
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-2">
        <Button className="w-full">Continuar</Button>
        <Button
          variant="link"
          className="w-full"
        >
          Cancelar
        </Button>
      </CardFooter>
    </Card>
  )
}
