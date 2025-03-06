import { BannerSection } from '@/components/app'
import { fetchConvocatory, fetchTimelineByConvocatory } from '@/api/convocatory'
import { IConvocatory, ITimeline } from '@/types'
import { ApplicationPeriod } from '@/modules/admision'

interface Props {
  params: { slug: string }
  children: React.ReactNode
}

export default async function Layout(props: Props) {
  const { children, params } = props
  const { slug } = params

  let convocatory: IConvocatory | null = null

  let sheduleData: ITimeline | null = null

  try {
    const response = await fetchConvocatory({
      uuid: slug,
    })
    if (response.data) {
      convocatory = response?.data[0]
    }
  } catch (error) {
    console.error('Error fetching convocatorias:', error)
  }

  try {
    // Fetch schedule
    const response = await fetchTimelineByConvocatory(slug)
    sheduleData = response?.data ? response.data : null
  } catch (error) {
    console.error('Error fetching shedule:', error)
  }

  return (
    <>
      <BannerSection
        title={`Convocatoria: ${convocatory?.description}`}
        description="Selecciona un programa de la lista de convocatorias disponibles para comenzar tu aplicación."
        backgroundImage="/images/banner_convocation.webp"
        bottomContent={
          <ApplicationPeriod
            start={convocatory?.start_date.toString() || ''}
            end={convocatory?.end_date.toString() || ''}
            timeline={sheduleData?.timeline || []}
            url_regulations={convocatory?.regulations || null}
          />
        }
      />
      {children}
    </>
  )
}
