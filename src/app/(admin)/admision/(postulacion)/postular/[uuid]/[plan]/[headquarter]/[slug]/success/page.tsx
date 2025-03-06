import { TO_APPLY_METADATA } from '@/config/metadata'
import { SuccessPage } from '@/modules/admision'
import { Metadata } from 'next'

export const metadata: Metadata = TO_APPLY_METADATA.PAGES.SUCCESS

export default function page() {
  return <SuccessPage />
}
