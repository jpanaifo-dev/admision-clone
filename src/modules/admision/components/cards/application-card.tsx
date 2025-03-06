import { Clock, Check } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type { ApplicationCardProps } from './card.interfaces'
import Link from 'next/link'

export const ApplicationCard = (props: ApplicationCardProps) => {
  const {
    title,
    postulatedAt,
    program_name,
    documents,
    observations,
    variant = 'default',
    status,
    url_link,
  } = props

  const variantStyles = {
    default:
      'border-t-0 border-b-0 border-r-0 border-l-8 border-border bg-gradient-to-r from-gray-100 to-gray-200 hover:bg-gray-100',
    warning:
      'border-t-0 border-b-0 border-r-0 border-l-8 border-warning-300 bg-gradient-to-r from-warning-50 to-warning-100 hover:bg-warning-100',
    danger:
      'border-t-0 border-b-0 border-r-0 border-l-8 border-red-500 bg-gradient-to-r from-red-100 to-red-200 hover:bg-red-100',
  }

  return (
    <Link
      href={url_link || '#'}
      passHref
    >
      <Card
        className={cn(
          'p-6 bg-card text-card-foreground border-2 transition-colors hover:cursor-pointer',
          'hover:border-border-hover hover:text-card-foreground-hover hover:shadow-xl',
          'transition-colors duration-200 ease-in-out',
          variantStyles[variant]
        )}
      >
        <div className="flex flex-col space-y-5">
          <div className="flex justify-between items-start">
            <div className="space-y-1.5">
              <p className="text-sm font-medium">
                Fecha de postulación:
                {postulatedAt}
              </p>
              <h3 className="text-xl font-extrabold tracking-tight md:text-2xl">
                {`Postulación a: ${title}`}
              </h3>
              <p className="text-sm text-gray-600 font-medium uppercase">{`En el programa ${program_name}`}</p>
            </div>

            <Badge
              variant={status === 'Aprobado' ? 'default' : 'secondary'}
              className="items-center gap-1.5 border-1.5 border-gray-500 hidden sm:flex"
            >
              {status === 'Aprobado' ? (
                <Check className="h-3.5 w-3.5" />
              ) : (
                <Clock className="h-3.5 w-3.5" />
              )}
              {status}
            </Badge>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium">Documentos presentados:</p>
              <div className="flex flex-wrap gap-2">
                {documents.map((document, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="bg-background/50 backdrop-blur-sm"
                  >
                    {document}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-1.5">
              <p className="text-sm font-medium">Observaciones</p>
              <p className="text-sm text-muted-foreground">{observations}</p>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  )
}
