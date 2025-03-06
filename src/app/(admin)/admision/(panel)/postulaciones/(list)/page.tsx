import { ApplicationsPage } from '@/modules/admision'
import { Metadata } from 'next'
import { fetchApplicationsRecords } from '@/api/convocatory'
import { IApplicationRecord, IUserAuth } from '@/types'
import { getUserAuth } from '@/lib/session'
import { APPLICATION_METADATA } from '@/config/metadata'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.APPLICATION_LIST

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth
  let applications_records: IApplicationRecord[] | null = null

  const response = await fetchApplicationsRecords({
    person_token: data.person_token,
  })
  if (response.status === 200) {
    applications_records = response.data || []
  }
  return <ApplicationsPage applications_records={applications_records} />
}
