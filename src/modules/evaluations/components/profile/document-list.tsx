'use client'
import { DocumentPreview } from '../cards/dowload-files'

interface Document {
  name: string
  size: string
  format: string
  rating: number
}

export function DocumentList() {
  const documents: Document[] = [
    {
      name: 'CV- Nombre del postulante',
      size: '2 MB',
      format: 'pdf',
      rating: 4,
    },
    {
      name: 'CV- Nombre del postulante',
      size: '2 MB',
      format: 'pdf',
      rating: 4,
    },
    {
      name: 'CV- Nombre del postulante',
      size: '2 MB',
      format: 'pdf',
      rating: 4,
    },
  ]

  return (
    <div className="space-y-4">
      <h2 className="font-medium">Documentos adjuntos</h2>
      <div className="space-y-2">
        {documents.map((doc, index) => (
          <DocumentPreview
            key={index}
            format="pdf"
            maxRating={5}
            size="2 MB"
            title="CV- Nombre del postulante"
            onView={() => {}}
            rating={4}
          />
        ))}
      </div>
    </div>
  )
}
