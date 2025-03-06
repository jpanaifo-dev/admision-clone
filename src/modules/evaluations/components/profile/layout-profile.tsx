import { ApplicantHeader } from './aplicant-header'
import { SidebarNav } from './side-bar'
import { ActivitySidebar } from './activity-sidebar'
import { Button } from '@/components/ui/button'
import { AlertCircle } from 'lucide-react'

interface LayoutProfileProps {
  children: React.ReactNode
}

export const LayoutProfile = (props: LayoutProfileProps) => {
  const { children } = props

  return (
    <div className="min-h-screen bg-gray-50">
      <ApplicantHeader
        name="Alindor David Piña Irarica"
        program="Etapa 2024 - II - Maestría en geología industrial"
        status="Estado del postulante"
      />
      <div className="flex gap-6 p-6">
        <SidebarNav />
        <div className="flex-1 space-y-6">
          <section className="flex items-start gap-2 rounded-lg bg-orange-50 p-4 text-orange-800">
            <AlertCircle className="h-5 w-5" />
            <div className="space-y-1">
              <h3 className="font-medium">Evaluar postulante</h3>
              <p className="text-sm">
                Inicia la evaluación del postulante seleccionando el valor
                correspondiente según su calificación o el nivel de cumplimiento
                de los requisitos establecidos.
              </p>
            </div>
          </section>
          {children}
          <div className="flex justify-end gap-2">
            <Button variant="outline">Cancelar</Button>
            <Button>Guardar cambios</Button>
          </div>
        </div>
        <ActivitySidebar />
      </div>
    </div>
  )
}
