import { fetchPersonsLanguage } from '@/api/persons'
import { APPLICATION_METADATA } from '@/config/metadata'
import { getUserAuth } from '@/lib/session'
import { LanguageInfoForm } from '@/modules/admision'
import { IPersonLanguage, IUserAuth } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.LANGUAGES_INFO

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Page(props: Props) {
  const { searchParams } = props
  const sessionData = await getUserAuth()

  const data: IUserAuth = sessionData as unknown as IUserAuth

  let languageData: IPersonLanguage[] = []
  let languageInfo: IPersonLanguage = {} as IPersonLanguage

  const isActivedDialog = searchParams.add === 'true'
  const edit = searchParams?.edit && searchParams?.edit.toString()

  try {
    const response = await fetchPersonsLanguage({
      person_token: data.person_token,
    })

    if (response.status === 200 && response.data) {
      languageData = response?.data
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
  }

  if (edit) {
    try {
      const response = await fetchPersonsLanguage({
        id: edit ? parseInt(edit) : undefined,
        person_token: data.person_token,
      })

      if (response.status === 200 && response.data) {
        languageInfo = response?.data[0]
      }
    } catch (error) {
      console.error('Error al obtener los datos del usuario:', error)
    }
  }

  return (
    <LanguageInfoForm
      person_token={data.person_token}
      activeDialog={isActivedDialog}
      idEdit={edit}
      defaultData={languageData}
      languageInfo={languageInfo}
    />
  )
}
