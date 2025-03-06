import { Metadata } from 'next'
import { IPersonFile, IPersonFileRequirements, IUserAuth } from '@/types'
import { getUserAuth } from '@/lib/session'
import { fetchPersonFiles, fetchFilesPending } from '@/api/files'
import { DocumentViewer } from '@/modules/files'
import { APPLICATION_METADATA } from '@/config/metadata'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.FILES

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth
  let applications_records: IPersonFile[] | null = null
  let files_pending: IPersonFileRequirements[] | null = null

  const [response, responsePending] = await Promise.all([
    fetchPersonFiles({
      is_active: true,
      person_token: data?.person_token,
    }),
    fetchFilesPending(data?.person_token),
  ])

  if (response.data) {
    applications_records = response.data
  }

  if (responsePending.data) {
    files_pending = responsePending.data
  }

  return (
    <article className="bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 min-h-[calc(100vh-64px)] ">
        <DocumentViewer
          filesPending={files_pending || []}
          filesList={applications_records || []}
          userAuth={data}
        />
      </main>
    </article>
  )
}
