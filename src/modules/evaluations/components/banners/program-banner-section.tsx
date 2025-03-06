import { ArrowLeft, ArrowRight, Users } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

export const ProgramBannerSection = () => {
  return (
    <section className="w-full shadow-none bg-gray-50 border p-4 rounded-lg flex gap-4">
      <Link href="/admin/evaluaciones">
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
          <CardTitle className="text-xl font-bold">Admisión 2024 - I</CardTitle>
        </div>
        <p className="text-muted-foreground text-sm w-full">
          Para brindarte una mejor experiencia, necesitamos algunos datos
          adicionales.
        </p>
        <footer className="space-y-4">
          <div className="space-y-4">
            <h3 className="text-xs font-medium text-gray-500">
              Requisitos generales del proceso de admisión:
            </h3>
            <div className="flex flex-wrap gap-2">
              <Badge className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700">
                CV
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
              >
                Copia de DNI
              </Badge>
              <Badge
                variant="secondary"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700"
              >
                Certificado de estudios
              </Badge>
            </div>
          </div>
          <Button
            variant="ghost"
            className="flex items-center gap-2 pl-0 text-blue-600 hover:bg-transparent hover:text-blue-700"
          >
            <Users className="h-4 w-4" />
            Ver lista completa
            <ArrowRight className="h-4 w-4" />
          </Button>
        </footer>
      </main>
    </section>
  )
}
