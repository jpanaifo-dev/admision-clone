'use client'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import Link from 'next/link'
const URL_BASE = ADMISSION_URLS_APP.PROFILE.URL_BASE

export const ProfileCompletion = ({ percentage }: { percentage: number }) => {
  return (
    <div className="min-h-screen bg-[#EEF5FF] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-8">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-square md:aspect-auto md:h-[300px]">
            <Image
              src="/svg/person-stunding.svg"
              alt="Ilustración de estudiante"
              fill
              className="object-contain"
              priority
            />
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <h1 className="text-2xl lg:text-3xl font-extrabold">
                ¡Completa tu perfil!
              </h1>
              <p className="text-gray-600">
                Te falta información para completar tu perfil y poder postular a
                la convocatoria.
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progreso de perfil</span>
                <span>{percentage}% completado</span>
              </div>
              <Progress
                value={percentage}
                className="h-2"
              />
            </div>

            {/* <div className="space-y-4">
              <h2 className="text-sm font-medium">Información pendiente</h2>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Número de documentos
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  Dirección
                </li>
                <li className="flex items-center gap-2 text-sm text-muted-foreground">
                  <GraduationCap className="h-4 w-4" />
                  Universidad de procedencia
                </li>
              </ul>
            </div> */}
            <div>
              <p className="text-sm text-muted-foreground">
                Ten en cuenta que la información que proporciones será utilizada
                para el proceso de admisión. Aprovecha de completar tu perfil
                para que tu postulación sea exitosa.{' '}
                <strong>¡Buena suerte!</strong>
              </p>
            </div>
            <Button
              className="w-full bg-primary-800 hover:bg-primary-900"
              asChild
            >
              <Link
                href={URL_BASE}
                target="_blank"
              >
                Completar mi perfil
              </Link>
            </Button>

            <div>
              <p className="text-sm text-center max-w-xs mx-auto">
                Si ya completaste tu perfil, recarga la página para actualizar
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}
