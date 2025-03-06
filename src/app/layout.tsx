import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'SIGAE-EPG | Escuela de Posgrado - UNAP',
  description:
    'Template de la Escuela de Posgrado de la Universidad Nacional de la Amazonía Peruana',
  openGraph: {
    images: [
      {
        url: 'https://firebasestorage.googleapis.com/v0/b/aurora-ecommerce.appspot.com/o/apps%2Flanding.webp?alt=media&token=9f164c5c-b328-43e1-828b-675030e4dabd',
        width: 1200,
        height: 630,
        alt: 'Template EPG - UNAP',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased bg-primary-50 text-foreground dark:bg-background-dark dark:text-foreground-dark`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
