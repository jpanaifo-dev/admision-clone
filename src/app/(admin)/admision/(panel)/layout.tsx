import { fetchPerson, fetchProgressInfo } from '@/api/persons'
import { BrandingLinkTopFooter } from '@/components/app/footer-custom/branding-link-top-footer'
import { NavbarUser } from '@/components/intranet'
import { admisionMenu } from '@/config/urls-data/menu-items-list'
import { getUserAuth } from '@/lib/session'
import { IPerson, IUserAuth } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | ADMISION | EPG - UNAP',
    default: 'ADMISION | EPG - UNAP',
  },
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  let personData: IPerson = {} as IPerson

  const [person, progressData] = await Promise.all([
    fetchPerson(data?.person_token),
    fetchProgressInfo({ person_token: data?.person_token }),
  ])

  if (person.status === 200 && person.data) {
    personData = person.data
  } else {
    console.error('Error al obtener los datos del usuario:', person)
  }

  return (
    <>
      <NavbarUser
        person={personData}
        menuItems={admisionMenu}
        email={data?.email}
        progressValue={progressData?.data?.progress_percentage}
      />
      {children}
      <BrandingLinkTopFooter />
    </>
  )
}
