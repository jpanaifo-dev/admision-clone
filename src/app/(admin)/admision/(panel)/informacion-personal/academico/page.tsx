import { fetchPersonsAcademic, fetchPersonsAcademicList } from '@/api/persons'
import { APPLICATION_METADATA } from '@/config/metadata'
import { getUserAuth } from '@/lib/session'
import { AcademicInfoForm } from '@/modules/admision'
import { IPersonAcademic, IPersonAcademicList, IUserAuth } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.ACADEMIC_INFO
interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page(props: Props) {
  const { searchParams } = props
  const sessionData = await getUserAuth()

  const data: IUserAuth = sessionData as unknown as IUserAuth

  let academicInfo: IPersonAcademicList[] = []
  let academicData: IPersonAcademic = {} as IPersonAcademic

  const isActivedDialog = searchParams.add === 'true'
  const edit = searchParams?.edit && searchParams?.edit.toString()

  try {
    const response = await fetchPersonsAcademicList({
      person_token: data.person_token,
    })

    if (response.status === 200 && response.data) {
      academicInfo = response?.data
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
  }

  if (edit) {
    try {
      const response = await fetchPersonsAcademic({
        id: edit ? parseInt(edit) : undefined,
        person_token: data.person_token,
      })

      if (response.status === 200 && response.data) {
        academicData = response?.data[0]
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error)
    }
  }

  return (
    <AcademicInfoForm
      person_token={data.person_token}
      defaultData={academicInfo}
      activeDialog={isActivedDialog}
      idEdit={edit}
      academicInfo={academicData}
    />
  )
}
