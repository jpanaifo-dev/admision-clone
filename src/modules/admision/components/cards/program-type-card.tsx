import { GraduationCap, ChevronRight } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import Link from 'next/link'
import { ProgramTypeCardProps } from './card.interfaces'
import { cn } from '@/lib/utils'

const colorsVariants = {
  primary: 'border-primary-200 hover:border-primary-500',
  secondary: 'border-secondary-200 hover:border-secondary-500',
  success: 'border-success-200 hover:border-success-500',
  danger: 'border-danger-200 hover:border-danger-500',
}

const iconColors = {
  primary: 'text-primary bg-primary/10 text-primary group-hover:bg-primary/20',
  secondary:
    'text-secondary bg-secondary/10 text-secondary group-hover:bg-secondary/20',
  success: 'text-success bg-success/10 text-success group-hover:bg-success/20',
  danger: 'text-danger bg-danger/10 text-danger group-hover:bg-danger/20',
}

export const ProgramTypeCard = (props: ProgramTypeCardProps) => {
  const { title = '', url, quantity, color = 'primary' } = props

  function getQuantity() {
    const label = quantity > 1 ? 'programas' : 'programa'
    return `${quantity} ${label} disponible${quantity > 1 ? 's' : ''}`
  }

  const colorVariant = colorsVariants[color]

  return (
    <Link href={url || '#'}>
      <Card
        className={cn(
          'group relative overflow-hidden transition-all duration-300',
          'hover:shadow-lg hover:-translate-y-1',
          'cursor-pointer border-l-5 border-r-0 border-y-0',
          colorVariant
        )}
      >
        <CardContent className="p-6">
          <div className="space-y-4">
            <div
              className={cn(
                'w-12 h-12 rounded-xl flex items-center justify-center transition-colors duration-300',
                iconColors[color]
              )}
            >
              <GraduationCap className="w-6 h-6 " />
            </div>
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-slate-900">{title}</h2>
              <p className="text-sm text-slate-600 font-semibold">
                {getQuantity()}
              </p>
              <p className="text-sm text-slate-600">
                Ver programas, filtrados solo {title?.toLowerCase()}
              </p>
            </div>
            <div className="inline-flex items-center text-sm text-blue-500 hover:text-blue-600 font-medium">
              Ver lista <ChevronRight className="ml-1 w-4 h-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
