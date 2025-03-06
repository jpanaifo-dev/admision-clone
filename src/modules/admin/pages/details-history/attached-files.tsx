import { AlertCustom } from '@/components/app'
import { Button } from '@/components/ui/button'
import { DocumentPreview } from '@/modules/evaluations'
import { SaveAll } from 'lucide-react'

export const AttachedFiles = () => {
  return (
    <div className="flex flex-col gap-4">
      <AlertCustom
        type="warning"
        title="Evaluar postulante"
        showIcon={true}
      >
        <p className="text-sm text-muted-foreground">
          El postulante aún no ha sido evaluado. Por favor, evalúalo para
          continuar con el proceso.
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
      <DocumentPreview
        title="Certificado de nacimiento"
        size="1 GB"
        format="PDF"
        maxRating={5}
        rating={1}
      />
    </div>
  )
}
