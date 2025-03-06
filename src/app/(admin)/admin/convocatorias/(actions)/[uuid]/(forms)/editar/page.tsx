import { fetchConvocatory } from '@/api/convocatory/convocatory'
import { InfoConvocatoryForm } from '@/modules/admin'

export default async function page({
  params,
}: {
  params: Promise<{ uuid: string }>
}) {
  const uuid = (await params).uuid

  const convocatory = await fetchConvocatory({ uuid: uuid })

  return (
    <>
      {convocatory && convocatory?.data && (
        <InfoConvocatoryForm defaultValues={convocatory?.data[0]} />
      )}
    </>
  )
}
