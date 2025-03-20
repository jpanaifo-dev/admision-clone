import { fetchPerson } from '@/api/persons'
import { fetchCountry, fetchUbigeo } from '@/api/location'
import { APPLICATION_METADATA } from '@/config/metadata'
import { getUserAuth } from '@/lib/session'
import { PersonalInfoForm } from '@/modules/admision'
import { ICountry, IPerson, IUbigeo, IUserAuth } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.PERSONAL_INFO

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPerson = {} as IPerson
  let countryData: ICountry | null = null
  let ubigeoData: IUbigeo | null = null

  try {
    const person = await fetchPerson(data?.person_token)
    if (person.status === 200 && person.data) {
      personData = person.data
    }
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error)
  }

  if (personData.country_uuid) {
    const country = await fetchCountry({
      uuid: personData.country_uuid,
    })
    countryData = country?.data?.[0] || null
  }

  if (personData.ubigeo_birth_uuid) {
    const ubigeo = await fetchUbigeo({
      uuid: personData.ubigeo_birth_uuid,
    })
    ubigeoData = ubigeo?.data?.[0] || null
  }

  return (
    <PersonalInfoForm
      defaultData={personData}
      countryDefaultData={countryData}
      ubigeoDefaultData={ubigeoData}
    />
  )
}
