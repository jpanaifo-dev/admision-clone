import { BannerSection } from '@/components/app'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { LayoutProfileWrapper } from '@/modules/app'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <BannerSection
        title="Configuración de Cuenta"
        description={`Administra y personaliza tu cuenta. Actualiza tu información personal, cambia tu contraseña, gestiona preferencias y configura opciones de seguridad para mejorar tu experiencia. 🚀`}
      />
      <div id="change-email-form" />
      <LayoutProfileWrapper
        removeWrapper
        items={[
          {
            title: 'Cambiar correo electrónico',
            url: `${ADMISSION_URLS_APP.PROFILE.ACCOUNT}`,
          },
          {
            title: 'Cambiar Contraseña',
            url: `${ADMISSION_URLS_APP.PROFILE.ACCOUNT}/cambiar-contrasena`,
          },
          {
            title: 'Preferencias',
            url: `${ADMISSION_URLS_APP.PROFILE.ACCOUNT}/#change-password-form`,
          },
        ]}
      >
        {children}
      </LayoutProfileWrapper>
    </>
  )
}
