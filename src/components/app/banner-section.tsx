'use client'
import { ReactNode } from 'react'
import Image from 'next/image'
import { BreadcrumbCustom } from './bread-crumb-custom'
import { Button } from '../ui/button'
import { ArrowLeft, Home } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'

interface HeaderProps {
  title?: string
  description?: string
  backgroundImage?: string
  hideBackButton?: boolean
  showBreadcrumb?: boolean
  rightContent?: ReactNode
  contentBackButton?: ReactNode
  bottomContent?: ReactNode
}

export default function BannerSection({
  title,
  description,
  backgroundImage,
  rightContent,
  hideBackButton,
  showBreadcrumb,
  bottomContent,
}: HeaderProps) {
  const router = useRouter()
  const pathname = usePathname()

  const pathBack = pathname.split('/').slice(0, -1).join('/')
  const isHome = pathname.split('/').length === 2

  const handleBack = () => {
    router.push(pathBack)
  }

  return (
    <div className="relative bg-gradient-to-r from-primary-900 via-primary-700 to-primary-800 py-16 md:py-20 overflow-hidden min-h-[320px] sm:min-h-[260px]">
      {backgroundImage && (
        <section className="absolute inset-0 -z-0">
          <Image
            src={backgroundImage}
            alt="background-image"
            fill
            className="object-cover object-center"
            priority
          />
        </section>
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-900 via-primary-800 to-primary-900 opacity-50 z-10" />
      <div className="absolute inset-0 bg-black opacity-80 z-0" />
      <div className="container relative z-10">
        <div className="flex flex-col md:flex-row justify-between sm:items-center">
          <div className="mb-8 md:mb-0 md:mr-8 order-2 sm:order-1 flex flex-col gap-4 lg:gap-5 items-start">
            {showBreadcrumb && <BreadcrumbCustom />}
            {!hideBackButton && (
              <>
                {isHome && (
                  <div className="w-6 h-6 flex items-center gap-2 text-white">
                    <div>
                      <Home
                        className=" text-white"
                        size={18}
                      />
                    </div>
                    Inicio
                  </div>
                )}
                {!isHome && (
                  <section className="mt-4">
                    <Button
                      variant="link"
                      onClick={handleBack}
                      className="text-white hover:text-white px-0"
                    >
                      <ArrowLeft className="w-4 h-4 mr-2" />
                      Volver
                    </Button>
                  </section>
                )}
              </>
            )}
            <div className="flex flex-col gap-2 lg:gap-3">
              {title && (
                <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-2">
                  {title}
                </h1>
              )}
              {description && (
                <p className="text-gray-300 max-w-2xl">{description}</p>
              )}
            </div>
          </div>
          {rightContent && (
            <div className="w-full md:w-auto order-1 sm:order-2">
              {rightContent}
            </div>
          )}
        </div>
        {bottomContent && <div className="mt-8">{bottomContent}</div>}
      </div>
    </div>
  )
}
