'use client'

import { Calendar, Users, GraduationCap, Building2 } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { BackButton } from '@/utils/back-button'
import { ProgramDetailCardProps } from './card.interfaces'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const ProgramDetailCard = ({
  title,
  plan,
  deadline,
  startDate,
  modality,
  areas,
  adress_headquarter,
  headquarter,
}: ProgramDetailCardProps) => {
  return (
    <Card className="max-w-2xl bg-white rounded-sm">
      <CardContent className="py-10 px-6">
        <div className="py-2">
          <BackButton className="text-primary-500" />
        </div>

        <div className="mb-4 text-primary">{plan}</div>

        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-primary-900 mb-4">
          {title}
        </h1>

        <div className="inline-block bg-primary-900 text-white text-sm px-4 py-2 mb-6">
          Inscripciones hasta {deadline}
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-primary-700" />
            <div>
              <span className=" text-primary-700 font-bold">Inicio:</span>{' '}
              <span className="text-primary-700 ">{startDate}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary-700" />
            <div>
              <span className="text-primary-700 font-bold">Modalidad:</span>{' '}
              <span className="text-primary-700 ">{modality}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <GraduationCap className="h-5 w-5 text-primary-700" />
            <div>
              <span className=" text-primary-700 font-bold">Areas:</span>{' '}
              <span className="text-primary-700 ">{areas}</span>
            </div>
          </div>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center gap-3 hover:cursor-pointer w-fit hover:underline">
                  <Building2 className="h-5 w-5 text-primary-700" />
                  <div>
                    <span className=" text-primary-700 font-bold">Sede:</span>{' '}
                    <span className="text-primary-700">
                      {headquarter || ' No definido'}
                    </span>
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent className="dark py-3">
                <div className="flex gap-3">
                  <Building2
                    className="mt-0.5 shrink-0 opacity-60"
                    size={16}
                    strokeWidth={2}
                    aria-hidden="true"
                  />
                  <div className="space-y-1">
                    <p className="text-[13px] font-medium">
                      Dirección de la sede
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {adress_headquarter || 'No definido'}
                    </p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  )
}
