import { fetchConvocatory } from '@/api/convocatory/convocatory'
import { fetchTimeline } from '@/api/convocatory/timeline'
import { TimelineConvocatoryForm } from '@/modules/admin'

export default async function Page({
  params,
}: {
  params: Promise<{ uuid: string }>
}) {
  const uuid = (await params).uuid
  const convocatory = await fetchConvocatory({ uuid: uuid })
  const timeline = await fetchTimeline({ convocatory__uuid: uuid })

  return (
    <>
      {convocatory && convocatory?.data && timeline && timeline?.data && (
        <TimelineConvocatoryForm
          convocatory={convocatory?.data[0]}
          defaultValues={timeline?.data}
        />
      )}
    </>
  )
}
