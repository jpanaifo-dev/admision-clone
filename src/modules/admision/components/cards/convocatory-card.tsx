'use client'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useFilterFromUrl } from '@/lib/filter-url'
import { ConvocationCardProps } from './card.interfaces'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { cn } from '@/lib/utils'

export const ConvocatoriaCard = ({
  id,
  status,
  title,
  description,
  isActive,
}: ConvocationCardProps) => {
  const router = useRouter()
  const { getParams } = useFilterFromUrl()
  const idPeriod = getParams({
    key: 'etapa',
    value: '',
  })
  const isSelected = idPeriod === id

  function handleConvocatoryClick() {
    if (idPeriod !== '' && idPeriod === id) {
      router.push(`${ADMISSION_URLS_APP.CONVOCATION.URL_BASE}`, {
        scroll: false,
      })
    } else {
      router.push(`${ADMISSION_URLS_APP.CONVOCATION.URL_BASE}?etapa=${id}`, {
        scroll: false,
      })
    }
  }

  return (
    <Card
      className={cn(
        'group flex items-start gap-4 px-4 py-6 rounded-lg hover:cursor-pointer',
        isActive || isSelected
          ? 'bg-slate-50 border-2 border-primary-800 shadow-sm'
          : 'hover:bg-gray-200 hover:border hover:border-gray-400',
        'transition-all duration-300'
      )}
      onClick={handleConvocatoryClick}
    >
      <div className="flex items-start gap-4">
        <div className="py-2 px-3 bg-white flex items-center justify-center shadow-xl rounded-md">
          <Image
            src="/brands/escudo-epg.webp"
            alt="Icon"
            width={24}
            height={24}
            className="rounded-full"
          />
        </div>
        <div className="flex-1 flex flex-col gap-1">
          <div className="flex items-center justify-between mb-2">
            <Badge
              className={
                status === 'active'
                  ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-100'
                  : 'bg-danger-50 text-danger-500 hover:bg-danger-100'
              }
            >
              {status === 'active' ? 'Activa' : 'Inactiva'}
            </Badge>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <p className="font-medium pb-1 text-sm">Convocatoria </p>
              <h3
                className={`font-extrabold mb-1 group-hover:underline text-xl  ${
                  (isActive || isSelected) && 'text-primary-800'
                }`}
              >
                {title}
              </h3>
            </div>
            <p className="text-sm text-slate-500">{description}</p>
          </div>
        </div>
      </div>
    </Card>
  )
}
