import { Card } from '@/components/ui/card'
import { ProgressCircle } from '@/modules/evaluations/components/profile/progress-circle'

export const PercentCard = () => {
    return (
        <Card className="p-6">
            <h2 className="font-bold mb-2">Información de postulante</h2>
            <p className="text-sm text-muted-foreground mb-6">
                La información del postulante a sido ingresada en su totalidad
            </p>

            {/* Progress Circle */}
            <div className="relative w-40 h-40 mx-auto">
                <ProgressCircle percentage={80} />

            </div>
            <p className="text-sm text-gray-600 text-center mt-4">
                Todos los campos requeridos han sido completados
            </p>
        </Card>
    )
}
