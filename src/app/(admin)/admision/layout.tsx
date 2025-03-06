'use client'
import { TokenExpirationModal } from '@/modules/auth'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {children}
      <TokenExpirationModal />
    </>
  )
}
