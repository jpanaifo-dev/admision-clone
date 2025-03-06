import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Eye, FilePenLine } from 'lucide-react'
import { IPersonFileRequirements } from '@/types'
import { TypeFileBadge } from '../badges'
import { format } from 'date-fns'

interface FileBlogCardProps {
  checked?: boolean
  fileRequirement: IPersonFileRequirements
  handlePreview: (fileUrl: IPersonFileRequirements) => void
}

export const FileBlogCard = (props: FileBlogCardProps) => {
  const { fileRequirement, handlePreview, checked } = props
  const { requirement, file } = fileRequirement
  const { name: title, description, requirement_type } = requirement

  const isFile = file !== null
  const isValidate = file?.is_valid

  return (
    <Card
      className={`w-full max-w-md hover:shadow-lg transition-shadow hover:cursor-pointer mb-3 ${
        isValidate
          ? 'bg-success-100 border-l-5 border-l-succes-500'
          : 'border-l-5 border-l-warning-500 bg-waborder-l-warning-50'
      }`}
      onClick={() => handlePreview(fileRequirement)}
    >
      <CardHeader className="space-y-0 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox checked={checked} />
              <span className="text-xs text-muted-foreground font-medium">
                {checked ? 'Seleccionado' : 'Seleccionar'}
              </span>
            </div>
            <div className="w-fit">
              <TypeFileBadge fileTypeId={requirement_type} />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-5 h-5">
              <img
                src="/images/pdf.png?height=20&width=20"
                alt="Flag"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          {file && (
            <time className="text-sm text-muted-foreground">
              Archivo subido el {format(file.created_at, 'dd/MM/yyyy')} |
              Actualizado el {format(file.updated_at, 'dd/MM/yyyy')}
            </time>
          )}
          <p className="text-sm text-muted-foreground">Se requiere:</p>
          <h3 className="font-semibold leading-tight">{title}</h3>

          <p className="text-sm text-muted-foreground">
            {description || 'No hay descripción'}
          </p>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Eye className="h-4 w-4" />
            <span>{isFile ? 'Archivo subido' : 'Sin archivo'}</span>
          </div>
          <div className="flex items-center gap-1">
            <FilePenLine className="h-4 w-4" />
            <span>
              {isFile ? 'Selecciona para actualizar' : 'No hay archivo'}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
