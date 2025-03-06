import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'

interface IWelcomeBannerProps {
  name: string
}

export const WelcomeBanner = (props: IWelcomeBannerProps) => {
  const { name = 'Pancracio' } = props

  const welcomeMessage = `¡Bienvenido, ${name}!`
  const description = `Estás a un paso de alcanzar tus metas profesionales. Explora nuestros
          programas y comienza tu desarrollo académico.`

  return (
    <div className="bg-blue-600 text-white rounded-lg p-6 w-full flex gap-6 relative">
      <section className="space-y-4 w-full">
        <h1 className="text-2xl font-semibold">{welcomeMessage}</h1>
        <p className="text-blue-100 text-sm sm:text-base">{description}</p>
        <div className="flex flex-col sm:flex-row gap-2">
          <Button
            variant="secondary"
            className="bg-white hover:bg-gray-100 text-blue-600"
            asChild
          >
            <Link href={ADMISSION_URLS_APP.CONVOCATION.URL_BASE}>
              Etapas activas
            </Link>
          </Button>
          <Button variant="ghost">
            <Link href={ADMISSION_URLS_APP.APPLICATION.URL_BASE}>
              Mis postulaciones
            </Link>
          </Button>
        </div>
      </section>
      <img
        src="/svg/graduation-cap.svg"
        alt="image-default"
        className="w-72 h-72 absolute bottom-0 right-6"
      />
    </div>
  )
}
