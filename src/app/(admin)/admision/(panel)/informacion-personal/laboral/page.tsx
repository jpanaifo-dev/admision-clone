import { getUserAuth } from '@/lib/session'
import { JobInfoForm } from '@/modules/admision'
import { IPersonJob, IPersonJobList, IUserAuth } from '@/types'
import { Metadata } from 'next'
import { fetchPersonsJob, fetchPersonsJobList } from '@/api/persons'
import { APPLICATION_METADATA } from '@/config/metadata'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.JOB_INFO

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page(props: Props) {
  const { searchParams } = props
  const sessionData = await getUserAuth()

  const data: IUserAuth = sessionData as unknown as IUserAuth

  let jobInfo: IPersonJobList[] = []
  let jobData: IPersonJob = {} as IPersonJob

  const isActivedDialog = searchParams.add === 'true'
  const edit = searchParams?.edit && searchParams?.edit.toString()

  try {
    const response = await fetchPersonsJobList({
      person_token: data.person_token,
    })

    if (response.status === 200 && response.data) {
      jobInfo = response?.data as IPersonJobList[]
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
  }

  if (edit) {
    try {
      const response = await fetchPersonsJob({
        id: edit ? parseInt(edit) : undefined,
        person_token: data.person_token,
      })

      if (response.status === 200 && response.data) {
        jobData = response?.data[0]
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error)
    }
  }

  return (
    <JobInfoForm
      person_token={data.person_token}
      defaultData={jobInfo}
      activeDialog={isActivedDialog}
      idEdit={edit}
      jobInfo={jobData}
    />
  )
}
