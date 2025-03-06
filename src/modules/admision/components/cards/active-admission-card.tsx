import {
  Calendar,
  GraduationCap,
  ScrollText,
  Info,
  SquarePen,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { AdmissionCardProps } from './card.interfaces'

export const ActiveAdmissionCard = (props: AdmissionCardProps) => {
  const {
    title,
    subtitle,
    dateRange,
    programCount,
    requirementCount,
    hasRequirements,
    isActive,
    onEdit,
    onDetails,
  } = props

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="flex justify-between w-full text-2xl font-bold">
          {title}
          {isActive && (
            <Badge className="ml-2 bg-green-100 text-green-700 hover:bg-green-100">
              Activo
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">{subtitle}</p>

        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">Desde: {dateRange}</span>
          </div>

          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">{programCount} programas</span>
          </div>

          <div className="flex items-center gap-2">
            <ScrollText className="h-5 w-5 text-muted-foreground" />
            <span className="text-sm">
              {requirementCount} requisitos{' '}
              {!hasRequirements && '| Ningún requisito'}
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            variant="default"
            className="bg-primary-900 text-default-300 hover:bg-primary-800"
            onClick={onEdit}
          >
            <SquarePen className="mr-2 h-4 w-4" />
            Editar
          </Button>
          <Link href={onDetails || ''}>
            <Button variant="outline">
              <Info className="mr-2 h-4 w-4" />
              Detalles
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
