import {
  ConvocatoryDetails,
  ConvocatoryListPage,
  EmptyConvocatorySchedule,
} from '@/modules/admision'
import { SearchParams } from '@/types'
import { IConvocatory, ITimeline } from '@/types/admission'
import { fetchConvocatory, fetchTimelineByConvocatory } from '@/api/convocatory'
import { APPLICATION_METADATA } from '@/config/metadata'
import { Metadata } from 'next'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.CONVOCATORIES

interface Props {
  searchParams: SearchParams
}

export default async function Page(props: Props) {
  const { searchParams } = props
  const { etapa } = searchParams

  let convocatorias: IConvocatory[] = []
  let scheduleList: ITimeline | null = null

  try {
    // Fetch convocatorias
    const response = await fetchConvocatory({
      is_active: true,
      is_public: true,
    })
    convocatorias = (await response.data) || []
  } catch (error) {
    console.error('Error fetching convocatorias:', error)
  }

  const isEmtpy = convocatorias.length === 0

  if (etapa) {
    try {
      // Fetch schedule
      const response = await fetchTimelineByConvocatory(etapa?.toString())
      scheduleList = response?.data ? response.data : null
    } catch (error) {
      console.error('Error fetching shedule:', error)
    }
  }

  const convocatoriaSelected = convocatorias?.find(
    (conv) => conv?.uuid === etapa
  )

  return (
    <>
      {!isEmtpy && (
        <main className="flex flex-col sm:flex-row gap-6 py-8 sm:py-12 container justify-start">
          <aside className="w-full sm:w-1/3 sm:sticky top-16 sm:top-20 h-fit z-20 bg-white sm:bg-transparent p-4 rounded-sm border sm:border-none sm:p-0">
            <ConvocatoryListPage convocatorias={convocatorias} />
          </aside>
          <article className="w-full sm:w-2/3 bg-white border rounded-md p-4 sm:p-6">
            {!etapa && (
              <main className="flex flex-col gap-4 items-center justify-center h-full border border-dashed">
                <section className="w-full h-fit">
                  <h2 className="font-extrabold text-center text-xl md:text-2xl">
                    Convocatorias disponibles
                  </h2>
                  <p className="text-center">
                    Seleccione una convocatoria para ver los detalles
                  </p>
                </section>
              </main>
            )}

            {etapa && (
              <ConvocatoryDetails
                convocatorySelected={convocatoriaSelected}
                data={scheduleList || undefined}
              />
            )}
          </article>
        </main>
      )}
      {isEmtpy && <EmptyConvocatorySchedule />}
    </>
  )
}
