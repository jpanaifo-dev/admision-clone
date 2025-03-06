import React from 'react'
import { EmailSignup } from '@/components/auth'
import { Metadata } from 'next'
import { AUTH_METADATA } from '@/config/metadata'

export const metadata: Metadata = AUTH_METADATA.PAGES.SIGN_UP

export default function Page() {
  return <EmailSignup />
}
