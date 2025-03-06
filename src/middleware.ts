import { NextResponse, NextRequest } from 'next/server'
import { ADMISSION_URLS_APP } from './config/urls-data/admission.urls.config'
import { ADMIN_URLS_APP } from './config/urls-data/admin.urls.config'
import { SERVICES_MODULES } from './config/modules.cofig'
import { getUserAuth } from './lib/session'
import { IUserAuth, SectionElement, SubmenuElement } from './types'
import { fetchSidebarAdminMenu } from './api/miscellaneous'

const APP_NAME = process.env.APP_NAME

const ROUTES_VALIDATION = {
  USER: {
    LOGIN: ADMIN_URLS_APP.LOGIN.URL_BASE,
    DASHBOARD: ADMISSION_URLS_APP.HOME.URL_BASE,
  },
  ADMIN: {
    LOGIN: ADMISSION_URLS_APP.AUTH.LOGIN,
    DASHBOARD: ADMIN_URLS_APP.HOME.URL_BASE,
    UNAUTHORIZED: '/unauthorized', // Ruta de acceso denegado
  },
}

const APP_TOKENS = {
  USER: SERVICES_MODULES.USER.TOKEN,
  ADMIN: SERVICES_MODULES.ADMIN.TOKEN,
}

// ✅ Función para verificar si la ruta está en el menú del usuario
const hasAccessToRoute = (
  menuItems: SectionElement[],
  pathname: string
): boolean => {
  return menuItems.some((section) =>
    section.menus.some(
      (menu) =>
        (menu?.menu?.url && pathname.startsWith(menu.menu.url)) ||
        menu.submenus.some(
          (submenu: SubmenuElement) =>
            submenu?.url && pathname.startsWith(submenu.url)
        )
    )
  )
}

export async function middleware(request: NextRequest) {
  const currentUser = request.cookies.get(`${APP_NAME}_session`)?.value
  const sessionData = await getUserAuth()
  const data: IUserAuth = sessionData as unknown as IUserAuth

  const isAuthenticated = !!currentUser
  const moduleType =
    Object.entries(APP_TOKENS).find(
      ([, token]) => token === data?.module_token
    )?.[0] || 'UNKNOWN'
  const { pathname } = request.nextUrl

  // ⚡ Si no está autenticado, permitir el acceso a login y auth
  if (!isAuthenticated) {
    if (pathname === '/login' || pathname === '/auth') {
      return NextResponse.next()
    }
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // 🚫 Bloquear acceso cruzado entre módulos
  if (moduleType === 'USER' && pathname.startsWith('/admin')) {
    return NextResponse.redirect(
      new URL(ROUTES_VALIDATION.USER.DASHBOARD, request.url)
    )
  }

  if (moduleType === 'ADMIN' && pathname.startsWith('/admision')) {
    return NextResponse.redirect(
      new URL(ROUTES_VALIDATION.ADMIN.DASHBOARD, request.url)
    )
  }

  // 🔄 Si está autenticado y está en login/auth, redirigir al dashboard
  if (pathname === '/login' && moduleType === 'USER') {
    return NextResponse.redirect(
      new URL(ROUTES_VALIDATION.USER.DASHBOARD, request.url)
    )
  }

  if (pathname === '/auth' && moduleType === 'ADMIN') {
    return NextResponse.redirect(
      new URL(ROUTES_VALIDATION.ADMIN.DASHBOARD, request.url)
    )
  }

  // 🔐 Validar acceso a la ruta si es ADMIN
  if (moduleType === 'ADMIN') {
    const menuItemsResponse = await fetchSidebarAdminMenu(data?.user_token)

    if (menuItemsResponse?.status === 200) {
      const menuItems = menuItemsResponse.data
      if (menuItems && !hasAccessToRoute(menuItems, pathname)) {
        return NextResponse.redirect(
          new URL(ROUTES_VALIDATION.ADMIN.UNAUTHORIZED, request.url)
        )
      }
    } else {
      console.error(
        'Error al obtener los menús del usuario:',
        menuItemsResponse
      )
      return NextResponse.redirect(
        new URL(ROUTES_VALIDATION.ADMIN.UNAUTHORIZED, request.url)
      )
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/admision/:path*', '/login', '/auth'],
}
