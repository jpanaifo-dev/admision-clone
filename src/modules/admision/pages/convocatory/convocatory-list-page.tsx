'use client'
import { IConvocatory } from '@/types/admission'
import { ConvocatoriaCard } from '../../components'
import { ScrollArea } from '@/components/ui/scroll-area'
import { format } from 'date-fns'
import { es } from 'date-fns/locale'

interface Props {
  convocatorias?: IConvocatory[]
}

export const ConvocatoryListPage = (prop: Props) => {
  const { convocatorias = [] } = prop
  return (
    <main className="flex flex-col gap-3">
      <article className="flex flex-col gap-4 h-fit top-14 sticky">
        <h2 className="font-bold sm:text-lg lg:text-2xl">
          Convocatorias disponibles
        </h2>
        <ScrollArea className=" pr-4">
          {convocatorias.map((conv) => (
            <div
              key={conv.id}
              className="mb-3"
            >
              <ConvocatoriaCard
                id={String(conv.uuid)}
                description={`Desde el ${format(
                  new Date(conv.start_date),
                  'dd/MM/yyyy',
                  { locale: es }
                )} hasta el ${format(new Date(conv.end_date), 'dd/MM/yyyy', {
                  locale: es,
                })}`}
                title={`${conv.description}`}
                status={conv.is_active ? 'active' : 'inactive'}
              />
            </div>
          ))}
        </ScrollArea>
      </article>
    </main>
  )
}
