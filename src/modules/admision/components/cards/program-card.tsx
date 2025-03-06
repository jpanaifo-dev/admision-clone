import { SERVICES_MODULES } from '@/config/modules.cofig'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, Users, BookOpen, Building2 } from 'lucide-react'
import { IProgramCallList } from '@/types/admission'
import { Image } from '@nextui-org/react'
import Link from 'next/link'

interface IProps {
  programCall: IProgramCallList
  href?: string
}

const URL_BASE =
  process.env.NODE_ENV === 'production'
    ? SERVICES_MODULES.PROGRAM.URL_PROD
    : SERVICES_MODULES.PROGRAM.URL_LOCAL

export const ProgramCard = (props: IProps) => {
  const { programCall, href } = props
  const { program, modality, vacancies, months_duration, headquarter } =
    programCall
  const { name, description, background, study_plan } = program
  const path = `${URL_BASE?.replace('/epg_program_service/api/', '')}`
  const image = `${path}${background}`

  return (
    <Card className="overflow-hidden border-none shadow-none rounded-sm flex flex-col h-full">
      <div className="relative h-48">
        <Image
          src={background ? image : '/images/bg-card.webp'}
          alt="Presentación del programa"
          className="object-cover w-full h-full"
          radius="none"
          removeWrapper
          loading="lazy"
          isBlurred
        />
      </div>
      <CardContent className="p-6 flex-grow">
        <div className="space-y-4">
          <header className="flex flex-col items-start gap-2">
            <Badge
              variant="secondary"
              className="bg-blue-50 text-blue-600 hover:bg-blue-50"
            >
              {modality}
            </Badge>
            <h2 className="text-2xl font-extrabold leading-tight uppercase">
              {name}
            </h2>
          </header>
          {study_plan.description && (
            <p className="text-sm font-semibold text-gray-600">
              Plan de estudios:{' '}
              <span className="text-gray-800 font-bold">
                {study_plan.description}
              </span>
            </p>
          )}
          <p className="text-gray-600 line-clamp-3 text-sm">{description}</p>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Building2 className="h-4 w-4 text-blue-600" />
              <span>{headquarter.name}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>{`${months_duration} meses`}</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="h-4 w-4 text-blue-600" />
              <span>{vacancies} vacantes</span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <BookOpen className="h-4 w-4 text-blue-600" />
              <span>
                {study_plan?.total_credits
                  ? `${study_plan.total_credits} créditos`
                  : 'No asignado'}{' '}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex justify-end">
        <Button
          className="bg-blue-600 hover:bg-blue-700"
          asChild
        >
          <Link href={href || '#'}>Inscribete ahora</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}
