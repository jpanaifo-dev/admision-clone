import {
  Calendar,
  GraduationCap,
  Info,
  SquarePen,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { IConvocatory } from '@/types/admission'

interface IProps {
  data?: IConvocatory
}

export const ActiveAdmissionCard = (props: IProps) => {
  const { data } = props

  const getAssignedProgramsCount = (programs?: { count: number }[]): string => {
    const totalPrograms = programs?.reduce((sum, program) => sum + program.count, 0) ?? 0;
    return totalPrograms > 0 ? `${totalPrograms} programas asignados` : 'Sin programas asignados';
  };

  const getPeriodText = (periodName?: string): string => {
    return periodName ? `Convocatoria para el periodo ${periodName}` : 'Convocatoria sin periodo asignado';
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <CardTitle className="flex justify-between w-full text-2xl font-bold">
          {data?.description}
          {data?.is_active && (
            <Badge className="ml-2 bg-green-100 text-green-700 h-6 hover:bg-green-100">
              Activo
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">
          {getPeriodText(data?.period?.name)}
        </p>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary-700" />
            <span className="text-sm">
              {`Desde: ${data?.start_date} al ${data?.end_date}`}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-primary-700" />
            <span className="text-sm">
              <p>{getAssignedProgramsCount(data?.programs)}</p>
            </span>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Link href={`/admin/convocatorias/${data?.uuid}/editar`}>
            <Button
              variant="default"
              className="bg-primary-700 text-default-300 hover:bg-primary-600"
            >
              <SquarePen className="mr-2 h-4 w-4" />
              Editar
            </Button>
          </Link>
          <Link href={`/admin/convocatorias/${data?.uuid}`}>
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
