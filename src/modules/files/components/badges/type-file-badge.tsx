import { Badge } from '@/components/ui/badge'
import { FILES_TYPES } from '../../constants/file_types'
import { User, Book, Factory, Globe, LayoutGrid } from 'lucide-react'

interface TypeFileBadgeProps {
  fileTypeId: number
}

const icons: { [key: number]: JSX.Element } = {
  1: <User size={14} />,
  2: <Book size={14} />,
  3: <Factory size={14} />,
  4: <Globe size={14} />,
  5: <LayoutGrid size={14} />,
}

export const TypeFileBadge = (props: TypeFileBadgeProps) => {
  const { fileTypeId } = props

  const getFileType = (requirementType: number) => {
    const fileType = FILES_TYPES?.find((type) => type.id === requirementType)
    return fileType ? fileType.name : 'Ninguno'
  }

  const fileTypeName = getFileType(fileTypeId)

  return (
    <Badge
      variant="outline"
      className="flex items-center "
    >
      {icons[fileTypeId]}
      {fileTypeName}
    </Badge>
  )
}
