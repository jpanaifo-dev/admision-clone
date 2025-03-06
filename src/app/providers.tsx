// app/providers.tsx
'use client'
import 'react-toastify/dist/ReactToastify.css'

import { NextUIProvider } from '@nextui-org/react'
import { ToastContainer } from 'react-toastify'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextUIProvider>
      {children}
      <ToastContainer position="top-center" />
    </NextUIProvider>
  )
}
