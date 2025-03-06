import { Trash } from 'lucide-react'

interface TrashProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  onDropZone: (fileId: string) => void
}

export const FloatingTrashButton: React.FC<TrashProps> = (props) => {
  const { onDropZone } = props

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  const handleDropZone = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    const fileId = event.dataTransfer.getData('text')
    onDropZone(fileId)
  }

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDropZone}
      className="fixed bottom-8 right-8 flex items-center justify-center w-16 h-16 bg-red-500 text-white rounded-full shadow-lg cursor-pointer"
    >
      <Trash className="w-6 h-6" />
    </div>
  )
}
