import { Login } from '@/components/auth'
import { AUTH_METADATA } from '@/config/metadata'
import { ADMIN_URLS_APP } from '@/config/urls-data/admin.urls.config'
import { getUserAuth } from '@/lib/session'
import { IUserAuth } from '@/types'
import { Metadata } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = AUTH_METADATA.PAGES.AUTH_ADMIN

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  if (data) {
    redirect(ADMIN_URLS_APP.LOGIN.URL_BASE)
  }

  return <Login path="admin" />
}
