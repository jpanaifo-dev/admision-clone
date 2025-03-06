import { Login } from '@/components/auth'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { getUserAuth } from '@/lib/session'
import { IUserAuth } from '@/types'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AUTH_METADATA } from '@/config/metadata'

export const metadata: Metadata = AUTH_METADATA.PAGES.LOGIN

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  if (data) {
    redirect(ADMISSION_URLS_APP.HOME.URL_BASE)
  }

  return <Login path="user" />
}
