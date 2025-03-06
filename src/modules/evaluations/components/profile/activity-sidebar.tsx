import { Trophy } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ProgressCircle } from './progress-circle'

export function ActivitySidebar() {
  return (
    <div className="w-80 space-y-4">
      <Card className="bg-[#0A2647] text-white">
        <CardHeader>
          <CardTitle className="text-sm font-medium">
            Actividad Reciente
          </CardTitle>
          <p className="text-xs text-gray-300">10:45 AM, 15 Sept 2021</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm">Evaluación del postulante</p>
          <p className="text-xs text-gray-300">
            La evaluación del postulante ha sido concluida.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-4xl font-bold">30.4</span>
            <Trophy className="h-8 w-8 text-yellow-400" />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="space-y-4">
          <h1 className="text-base font-bold pt-5">
            Información de postulante
          </h1>
          <p className="text-sm text-gray-600">
            La información del postulante ha sido ingresada en su totalidad
          </p>

          <div className="flex justify-center pt-4">
            <ProgressCircle percentage={30} />
          </div>
          <hr className="border-gray-200" />
          <p className="text-sm text-gray-600">
            Todos los campos requeridos han sido completados
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
