import { Button } from '@/components/ui/button'
import { Footer, NavBar } from '@/modules/app'
import Link from 'next/link'

export default function Page() {
  return (
    <>
      <NavBar />
      <section className="w-full min-h-screen 2xl:min-h-[50vh] h-screen flex flex-col items-center justify-center py-12 relative overflow-hidden max-h-[calc(100vh-65px)]">
        {/* Contenedor del texto */}
        <div className="relative z-10 w-full container text-white flex flex-col items-center justify-center md:flex-row md:items-start md:justify-start">
          <section>
            <div className="w-full max-w-2xl mx-auto">
              <p className="text-lg md:text-xl text-gray-300">
                Aperturamos la convocatoria para el{' '}
              </p>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight mt-4">
                Proceso de Admisión 2025-I
              </h2>
              <p className="text-lg md:text-xl mt-4">
                Descubre la experiencia de estudiar en la EPG - UNAP
              </p>
            </div>
            <Button
              className="rounded-full bg-primary-500 hover:bg-primary-600 text-white font-bold py-3 px-6 mt-8"
              asChild
            >
              <Link href={`/login`}>Registrarme</Link>
            </Button>
          </section>
        </div>

        {/* Fondo con gradiente y imagen */}
        <div className="absolute inset-0 z-0">
          {/* Gradiente oscuro */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/50"></div>
          {/* Imagen de fondo */}
          <img
            src="/landing/landing-banner.webp"
            alt="Hero"
            className="w-full h-full object-cover"
            width={2400}
            height={2400}
          />
        </div>
      </section>
      <Footer />
    </>
  )
}
