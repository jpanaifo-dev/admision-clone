import Link from 'next/link'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'

export const AlreadyAppliedPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-3xl w-full bg-white shadow-lg rounded-lg p-8 text-center flex flex-col items-center justify-center">
        <Image
          alt="Ya has postulado"
          src="/svg/not-avaliable.svg"
          width={500}
          height={500}
        />
        <h1 className="text-3xl md:text-4xl xl:text-5xl font-extrabold text-gray-900 mb-4">
          ¡ Ya estás postulando actualmente !
        </h1>
        <p className="text-gray-600 mb-8 lg:text-lg">
          Ya realizaste el proceso de inscripción, estás postulando a un
          programa. No puedes postular a otra hasta que finalice el proceso
          actual.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild>
            <Link href={ADMISSION_URLS_APP.HOME.URL_BASE}>
              Volver al inicio
            </Link>
          </Button>
          <Button
            asChild
            variant="ghost"
            className="border"
          >
            <Link href={ADMISSION_URLS_APP.APPLICATION.URL_BASE}>
              Ver historial de postulaciones
            </Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
