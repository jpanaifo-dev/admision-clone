import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { FilePenLine, GraduationCap, Building2, Eye, Earth } from 'lucide-react'
import Link from 'next/link'
import { ProfileInfoCardProps } from './card.interfaces'
import { formatDateRange, getLastYearsJobs } from './functions'

const icons = {
  academic: <GraduationCap />,
  job: <Building2 />,
  language: <Earth />,
}

const DELAY_DURATION = 200

const LabelMonth = {
  academic: 'duración',
  job: 'experiencia',
  language: 'duración',
}

export const ProfileInfoCard = (props: ProfileInfoCardProps) => {
  const {
    title,
    company, // Company or institution
    country, // Country or city
    end_date,
    start_date,
    modality,
    subtitle,
    hrefEdit,
    variant = 'academic',
    isFileUrl,
  } = props

  const iconsSelected = icons[variant]
  const labelMonth = LabelMonth[variant]

  const date = formatDateRange(start_date, end_date)
  const lastYears = getLastYearsJobs(start_date, end_date, labelMonth)

  return (
    <Card className="w-full p-4 relative flex flex-col gap-4 hover:bg-gray-100 group rounded-sm">
      <TooltipProvider delayDuration={DELAY_DURATION}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              className="absolute right-4 top-4 text-gray-500 hover:text-gray-700"
              asChild
            >
              <Link href={hrefEdit || '#'}>
                <FilePenLine className="h-5 w-5" />
              </Link>
            </Button>
          </TooltipTrigger>
          <TooltipContent className="text-sm text-white bg-gray-900">
            Editar información
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <div className="flex gap-4">
        <div className="p-2 rounded-lg border border-gray-400 bg-gray-100 flex items-center justify-center h-fit w-fit">
          {iconsSelected}
        </div>

        <div className="flex-1 flex flex-col gap-0.5">
          <h2 className="font-bold group-hover:text-primary-800 text-lg">
            {title}
          </h2>
          <p className="text-gray-900 text-sm">{company || 'No definido'}</p>
          {start_date && (
            <p className="text-gray-700 text-sm">
              {date} <span className="text-gray-400">•</span> {lastYears}
            </p>
          )}
          {country && <p className="text-gray-500 text-sm">{country}</p>}
          {subtitle && (
            <p className="text-gray-700 text-sm pt-2">
              {subtitle}
              {modality && (
                <span className="text-gray-700 text-sm"> • {modality}</span>
              )}
            </p>
          )}
          <div className="flex items-center gap-2 mt-2">
            <div className="flex items-center gap-1 text-blue-600">
              {isFileUrl && (
                <Link
                  target="_blank"
                  href={isFileUrl || '#'}
                  className="text-blue-600 text-xs font-medium flex gap-2 items-center"
                >
                  <Eye className="h-4 w-4" />
                  Ver documento
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}
