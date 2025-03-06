'use client'

import { ScrollArea } from '@/components/ui/scroll-area'
import { ActiveAdmissionCard } from '../../components'
import FiltersSection from '@/modules/admin/pages/evaluations-history/components/filters-section'
import { IConvocatory } from '@/types/admision/IConvocatory'

interface IProps {
  admission?: IConvocatory[]
}

export const ActiveAdmissionGrid = (props: IProps) => {
  const { admission } = props

  return (
    <main className="flex flex-col gap-5">
      <FiltersSection />
      <article className="flex flex-col gap-4">
        <ScrollArea className="h-full w-full pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 md:gap-4 xl:grid-cols-3 gap-4 w-full">
            {admission ? (
              admission.map((conv) => (
                <div
                  key={conv.description}
                  className="mb-2"
                >
                  <ActiveAdmissionCard
                    title="Admisión 2024 - I"
                    subtitle="Proceso de admisión primer semestre 2024"
                    dateRange="2024-01-01 al 2024-03-31"
                    programCount={3}
                    requirementCount={3}
                    hasRequirements={true}
                    isActive={true}
                    onDetails={`/admin/convocatorias/${conv.description}`}
                  />
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full h-32">
                <p className="text-gray-400 text-sm">
                  No hay convocatorias activas
                </p>
              </div>
            )}
          </div>
        </ScrollArea>
      </article>
    </main>
  )
}
