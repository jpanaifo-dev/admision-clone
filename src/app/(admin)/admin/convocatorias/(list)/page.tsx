import { ActivesConvocatoriesPage } from '@/modules/admin'
import { ErrorFallback } from '@/components/app/error-fallback'
import { fetchConvocatoryList } from '@/api/convocatory/convocatory'

export default async function Page() {
  const convocatories = await fetchConvocatoryList({ is_active: true })
  const { data, status } = convocatories

  return (
    <>
      {status === 500 ? (
        <ErrorFallback />
      ) : (
        <ActivesConvocatoriesPage admission={data} />
      )}
    </>
  )
}
