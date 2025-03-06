import { AlertCustom } from '@/components/app'
import { Button } from '@/components/ui/button'
import { EducationCard } from '@/modules/evaluations'
import { SaveAll } from 'lucide-react'

export const PersonalHistory = () => {
  return (
    <div className="flex flex-col gap-4">
      <AlertCustom
        type="warning"
        title="Evaluar postulante"
        showIcon={true}
      >
        <p className="text-sm text-muted-foreground">
          Inicia la evaluación del postulante seleccionando el valor
          correspondiente según su calificación o el nivel de cumplimiento de
          los requisitos establecidos.
        </p>
      </AlertCustom>
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Documentos adjuntos</h3>
        <Button
          className="flex items-center bg-gray-300"
          size={'sm'}
        >
          {' '}
          <SaveAll /> Guardar avance
        </Button>
      </div>
      <EducationCard
        title="Bchr. Ingeniería de Sistemas e Informática"
        startDate="20 de febrero 2024"
        endDate="28 de marzo 2024"
        university="Universidad Nacional de la Amazonia Peruana"
        status="Egresado"
        diplomaDate="20 - 11 - 2024"
        variant="education"
      />
    </div>
  )
}
