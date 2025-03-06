import { AdminPanelLayout, NavBarCustom } from '@/components/app'
import { MenuConfigApps } from '@/types/configApps'
import type { Metadata } from 'next'

interface LayoutProps {
  children: React.ReactNode
}

export const metadata: Metadata = {
  title: {
    template: '%s | Documentación',
    default: 'Bienvenido',
  },
  description: 'Documentación de la aplicación',
}

const APP_NAME_KEY: MenuConfigApps = 'docs'

export default function Layout(props: LayoutProps) {
  const { children } = props

  return (
    <>
      <NavBarCustom app={APP_NAME_KEY} />
      <AdminPanelLayout app={APP_NAME_KEY}>{children}</AdminPanelLayout>
    </>
  )
}
