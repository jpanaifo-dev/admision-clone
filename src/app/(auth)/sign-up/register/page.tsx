import { Register } from '@/components/auth'
import { AUTH_METADATA } from '@/config/metadata'
import { Metadata } from 'next'
import React, { Suspense } from 'react'

export const metadata: Metadata = AUTH_METADATA.PAGES.REGISTER

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Register />
    </Suspense>
  )
}
