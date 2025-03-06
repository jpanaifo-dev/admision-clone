'use client'
import { NavigationMenuDemo } from './menu-items'
import { NavigationMenuDemoProps } from './INavbarProps'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { MENU_PROFILE } from '@/config/urls-data/profile-menu'
import { MobileMenu } from './menu-items-mobile'
import { ProfilePopover } from '@/modules/app'
import { LogoRender } from '@/components/app/miscellaneous'

export const NavbarUser = ({
  menuItems,
  person,
  email,
  progressValue,
}: NavigationMenuDemoProps) => {
  return (
    <nav className="bg-primary-900 border-b border-white sticky top-0 right-0 left-0 z-40">
      <header className="container py-3 flex items-center justify-between gap-8">
        <LogoRender
          nameApp="ESCUELA DE POSTGRADO UNAP"
          href={ADMISSION_URLS_APP.HOME.URL_BASE}
        />
        {/*Menu de navegación desktop*/}
        <NavigationMenuDemo
          person={person}
          menuItems={menuItems}
          email={email}
        />
        <section className="w-fit flex items-center gap-4">
          {/*Menu de perfil*/}
          <ProfilePopover
            profileData={{
              names: `${person?.names} ${person?.last_name1} ${person?.last_name2}`,
              email,
              photo: person?.photo,
            }}
            menuSections={MENU_PROFILE.USER}
            progressValue={progressValue}
          />
          {/*Menu de navegación mobile*/}
          <MobileMenu items={menuItems} />
        </section>
      </header>
    </nav>
  )
}
