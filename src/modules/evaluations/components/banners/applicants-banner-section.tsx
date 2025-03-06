'use client'
import { ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const ApplicantsBannerSection = () => {
  const pathname = usePathname()
  const urlPrev = pathname.split('/').slice(0, -1).join('/')
  return (
    <section className="w-full shadow-none bg-gray-50 border p-4 rounded-lg flex gap-4">
      <Link href={urlPrev}>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 border"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
      </Link>
      <main className="w-full flex flex-col gap-4">
        <div className="flex items-center gap-4">
          <CardTitle className="text-xl font-bold">
            Postulantes: Maestría en panadería nuclear{' '}
          </CardTitle>
        </div>
        <p className="text-muted-foreground text-sm w-full">
          Plan de estudios 2024 - I
        </p>
        <footer className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-gray-500">
              Requisitos específicos del programa:
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700">
                Certificado de estudios
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
              >
                Constancia de egresado
              </Badge>
            </div>
          </div>
        </footer>
      </main>
    </section>
  )
}
