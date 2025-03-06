import { fetchPerson } from '@/api/persons'
import { APPLICATION_METADATA } from '@/config/metadata'
import { getUserAuth } from '@/lib/session'
import { PersonalInfoForm } from '@/modules/admision'
import { IPerson, IUserAuth } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.PERSONAL_INFO

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPerson = {} as IPerson

  try {
    const person = await fetchPerson(data?.person_token)
    if (person.status === 200 && person.data) {
      personData = person.data
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
  }

  return <PersonalInfoForm defaultData={personData} />
}
