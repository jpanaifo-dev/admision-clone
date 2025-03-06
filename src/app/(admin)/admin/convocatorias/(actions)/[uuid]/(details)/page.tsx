import { fetchConvocatory } from '@/api/convocatory/convocatory'
import { fetchTimeline } from '@/api/convocatory/timeline'
import { AlertCustom } from '@/components/app'
import { TabsSelection } from '@/modules/admision/pages/convocatory/details-admission-components/tabs-selection'
import { SearchParams } from '@/types'

interface IProps {
  params: {
    uuid: string | undefined
  }
  searchParams: SearchParams
}

export default async function page(props: IProps) {
  const { params, searchParams } = props

  const uuid = (await params).uuid
  const { section = '' } = await searchParams

  if (!uuid) {
    console.error('Details are undefined')
    return null
  }

  const querySection = Array.isArray(section) ? section.join(' ') : section

  const response = await fetchConvocatory({ is_active: true, uuid })
  const timeline = await fetchTimeline({ convocatory__uuid: uuid })

  const { data: convocatoriesData = [] } = response || {}
  const { data: timelineData = [] } = timeline || {}

  //NEW FEAT

  return (
    <>
      <div className="pt-2">
        <AlertCustom
          title="Actualización de convocatoria"
          showIcon={true}
          type="warning"
        >
          <p>
            La convocatoria ha sido actualizada, por favor, verifique la
            información actualizada.
          </p>
        </AlertCustom>
      </div>
      <TabsSelection
        timelineData={timelineData}
        convocatoriesData={convocatoriesData}
        params={{ uuid }}
        querySection={querySection}
      />
    </>
  )
}
