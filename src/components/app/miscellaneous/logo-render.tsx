import { cn } from '@/lib/utils'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export const LogoRender = ({
  nameApp,
  subtitle,
  href,
  className,
}: {
  nameApp: string
  subtitle?: string
  href: string
  className?: string
}) => {
  return (
    <section id="logo">
      <Link
        href={href}
        className="flex items-center gap-2 w-fit hover:cursor-pointer"
      >
        <Image
          src="/brands/escudo-epg.webp"
          alt="logo-epg"
          className="w-6 h-10"
          width={24}
          height={40}
        />
        <h1 className={cn(' font-semibold text-xs text-white', className)}>
          {nameApp || 'ESCUELA DE POSTGRADO UNAP'}
        </h1>
        {subtitle && (
          <h2 className="w-32 min-w-32 font-semibold text-xs text-white">
            {subtitle}
          </h2>
        )}
      </Link>
    </section>
  )
}
