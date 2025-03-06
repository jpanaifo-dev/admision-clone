import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { ADMIN_URLS_APP } from '@/config/urls-data/admin.urls.config'
import { IConvocatory } from '@/types'
import { formatDate } from '@/utils/format-timeline-dates'
import { FilePenLine, GraduationCap, Megaphone } from 'lucide-react'
import Link from 'next/link'

export const AdmissionCard = ({ data }: { data: IConvocatory }) => {
  const { description, end_date, start_date, period, programs } = data || {}
  const startDate = formatDate(start_date)
  const endDate = formatDate(end_date)

  return (
    <Card className="group">
      <CardHeader>
        <CardTitle className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <div className="w-fit flex items-center gap-2 p-2 rounded-md bg-lime-400">
              <Megaphone className="w-8 h-8 text-lime-100" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">
                Convocatoria abierta
              </p>
              <Link
                href={ADMIN_URLS_APP.CONVOCATORIES.CONVOCATORY_DETAIL(
                  data.uuid
                )}
                className="text-xl font-bold transition-colors duration-300 group-hover:underline"
              >
                {description}
              </Link>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href={ADMIN_URLS_APP.CONVOCATORIES.EDIT(data.uuid)}>
                  <Button
                    size="icon"
                    variant="ghost"
                  >
                    <FilePenLine />
                  </Button>
                </Link>
              </TooltipTrigger>
              <TooltipContent>Editar convocatoria</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>

        <CardDescription className="pt-2 flex flex-col gap-1">
          <p className="text-sm text-gray-500">
            Convocatoria disponible del {startDate} - {endDate}
          </p>
          <p>
            Periodo:{' '}
            <span className="text-sm text-gray-500">
              {period?.name || 'No asignado'}
            </span>
          </p>
        </CardDescription>
      </CardHeader>
      <hr className="border-t border-gray-200" />
      <CardContent>
        <div className="pt-3 ">
          <h3 className="text-base font-semibold pb-2">
            Programas en convocatoria:
          </h3>
          <div className="flex flex-wrap gap-4">
            {programs && programs.length > 0 ? (
              programs.map((program, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2"
                >
                  <GraduationCap className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">
                    {program.program_type}: {program.count}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">
                No hay programas disponibles
              </p>
            )}
          </div>
        </div>
      </CardContent>
      {/* <CardFooter className="flex justify-end gap-3">
        <Button>Ver detalles</Button>
        <Button>Editar</Button>
      </CardFooter> */}
    </Card>
  )
}
