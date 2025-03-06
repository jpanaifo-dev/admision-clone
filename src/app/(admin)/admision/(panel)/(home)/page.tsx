import { fetchProgressInfo } from '@/api/persons'
import { APPLICATION_METADATA } from '@/config/metadata'
import { getUserAuth } from '@/lib/session'
import { ActionCards } from '@/modules/admision/pages/home/actions-card'
import { EventsAndNotifications } from '@/modules/admision/pages/home/events-notification'
import { ProfileCompletion } from '@/modules/admision/pages/home/profile-completion'
import { IUserAuth } from '@/types'
import { Metadata } from 'next'

export const metadata: Metadata = APPLICATION_METADATA.PAGES.HOME

export default async function Page() {
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  const [progressData] = await Promise.all([
    fetchProgressInfo({ person_token: data?.person_token }),
  ])

  return (
    <>
      <ProfileCompletion
        variant={
          Number(progressData?.data?.progress_percentage) < 100
            ? 'warning'
            : 'success'
        }
        progress={progressData?.data?.progress_percentage || 0}
        closable={progressData?.data?.progress_percentage === 100}
      />
      <ActionCards />
      <EventsAndNotifications />
    </>
  )
}
