import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { FilePenLine, Check } from 'lucide-react'
import { IPersonFile } from '@/types'
import { format } from 'date-fns'
import { getLastUrlSegment } from '../../constants/actions'
import { TypeFileBadge } from '../badges'

interface BlogCardProps {
  file: IPersonFile
  handlePreview: (fileUrl: IPersonFile) => void
  checked?: boolean
}

export const FileUploadCard = ({
  file,
  handlePreview,
  checked = true,
}: BlogCardProps) => {
  const { created_at, file_Type, is_valid, updated_at } = file

  return (
    <Card
      className={`w-full max-w-md hover:shadow-lg transition-shadow mb-3 ${
        is_valid
          ? 'border-l-5 bg-success-100 border-l-success-500'
          : 'border-l-5 border-l-danger-500 bg-danger-50'
      }`}
      onClick={() => handlePreview(file)}
    >
      <CardHeader className="space-y-0 pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <Checkbox checked={checked} />
              <span className="text-xs text-muted-foreground">
                {checked ? 'Seleccionado' : 'Seleccionar'}
              </span>
            </div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <TypeFileBadge fileTypeId={file_Type} />
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
          <time className="text-sm text-muted-foreground">
            Creado el {format(new Date(created_at), 'dd/MM/yyyy')} | Última
            actualización el {format(new Date(updated_at), 'dd/MM/yyyy')}
          </time>
          <h3 className="font-semibold leading-tight">
            {getLastUrlSegment(file?.file)}
          </h3>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            <span>{is_valid ? 'Validado' : 'No validado'}</span>
          </div>
          <div className="flex items-center gap-1">
            <FilePenLine className="h-4 w-4" />
            <span>{file ? 'Archivo subido' : 'Sin archivo'}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
