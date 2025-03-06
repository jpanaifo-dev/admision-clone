import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar } from "lucide-react"

export const PeriodPostCard = () => {
  return (
    <>
      <Card className="mt-6 bg-default-900 border rounded-sm">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="bg-blue-600/20 p-2.5 rounded-full">
                <Calendar className="h-6 w-6 text-blue-500" />
              </div>
              <div className="space-y-1">
                <h2 className="font-semibold text-default-300">Periodo de postulación</h2>
                <p className="text-sm text-gray-400">15 de Enero al 15 de Marzo, 2024</p>
                <p className="text-sm text-gray-400">
                  Queda 45 días para postular
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button variant="outline">
                Cronograma completo
              </Button>
              <Button>
                Validar pago
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
