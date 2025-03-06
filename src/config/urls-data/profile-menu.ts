'use client'
import { handleLogout } from '@/modules/auth/utils/logout'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { MenuSection } from '@/modules/app'
import { ADMIN_URLS_APP } from './admin.urls.config'

export const MENU_PROFILE_ADMIN: MenuSection[] = [
  {
    label: 'Administración',
    items: [
      {
        label: 'Perfil',
        href: ADMIN_URLS_APP.PROFILE.URL_BASE,
      },
      {
        label: 'Configuración',
        href: ADMIN_URLS_APP.PROFILE.SETTINGS,
      },
      {
        label: 'Cerrar sesión',
        onClick: () => {
          handleLogout(ADMIN_URLS_APP.LOGIN.URL_BASE)
          localStorage.removeItem('loginMethod')
        },
      },
    ],
  },
]

export const MENU_PROFILE_USER: MenuSection[] = [
  {
    label: 'Opcciones',
    items: [
      {
        label: 'Perfil',
        href: ADMISSION_URLS_APP.PROFILE.URL_BASE,
      },
      {
        label: 'Mi cuenta',
        href: ADMISSION_URLS_APP.PROFILE.ACCOUNT,
      },
      {
        label: 'Cerrar sesión',
        onClick: () => {
          handleLogout(ADMISSION_URLS_APP.AUTH.LOGIN)
          localStorage.removeItem('loginMethod')
        },
      },
    ],
  },
]

export const MENU_PROFILE = {
  ADMIN: MENU_PROFILE_ADMIN,
  USER: MENU_PROFILE_USER,
}
