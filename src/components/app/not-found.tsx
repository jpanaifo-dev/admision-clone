'use client'
// import { MenuResponse } from '@/types'
// import { usePathname } from 'next/navigation'

// interface IProps {
//   data?: MenuResponse
// }

export default function NotFoundPage() {
  // const { data } = props

  // const pathname = usePathname()

  // console.log('pathname:', pathname)

  // const menuList = data?.sections.map((section) =>
  //   section.menus.map((menu) => ({
  //     href: menu.menu.url,
  //     submenus: menu.submenus.map((submenu) => submenu.url ?? ''),
  //   }))
  // )

  // Aplanar las URLs en una lista
  // const allowedUrls: string[] =
  //   menuList
  //     ?.flat()
  //     .reduce<string[]>((acc, menu) => {
  //       acc.push(menu?.href || '')
  //       acc.push(...menu.submenus)
  //       return acc
  //     }, [])
  //     .filter(Boolean) || []

  // console.log('allowedUrls:', allowedUrls)

  // if (allowedUrls.includes(pathname)) {
  //   return null
  // }

  return (
    <>
      <span>
        <h1>404</h1>
        <p>Page not found</p>
      </span>
    </>
  )
}
