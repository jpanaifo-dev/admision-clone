'use client'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const DATA_TIPS = [
  {
    title: 'Documentos requeridos',
    url: 'https://cdn-icons-png.flaticon.com/512/2436/2436874.png',
    description:
      'Asegúrate de tener todos los documentos requeridos listos antes de comenzar tu aplicación.',
  },
  {
    title: 'Tiempo de aplicación',
    url: 'https://cdn-icons-png.flaticon.com/512/11444/11444875.png ',
    description:
      'Recuerda que solo puedes postularte una vez por convocatoria. Asegúrate de tener todo listo.',
  },
  {
    title: 'Costos',
    url: 'https://cdn-icons-png.flaticon.com/512/11632/11632900.png ',
    description:
      'Tu pago de postulación se validará y su uso será exclusivo solo una única vez.',
  },
]

export const ApplyToPage = () => {
  const pathname = usePathname()

  return (
    <main className="min-h-screen flex justify-center items-center container mx-auto py-14">
      <section className="bg-white p-8 border-2 border-gray-300 rounded-lg w-full max-w-xl flex flex-col gap-8">
        <header className="space-y-4">
          <h2 className="text-center text-2xl lg:text-3xl font-black bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-primary-900">
            Estás a un paso de confirmar tu postulación
          </h2>
          <p className="text-center text-gray-500 max-w-lg mx-auto">
            Asegúrate de tener todos los documentos requeridos listos antes de
            comenzar tu aplicación. Ten en cuenta lo siguiente:
          </p>
        </header>
        <div>
          <div className="grid grid-cols-1 gap-4 border border-gray-300 rounded-md">
            {DATA_TIPS.map((tip, index) => (
              <div
                key={index}
                className={`flex items-start p-6 gap-6 ${
                  index % 2 === 0 ? 'bg-gray-100' : 'bg-white'
                }`}
              >
                <img
                  src={tip.url}
                  alt={tip.title}
                  className="w-14 h-14 border border-gray-300 rounded-full p-2 bg-primary-100"
                />
                <div className="text-start">
                  <h3 className="font-bold">{tip.title}</h3>
                  <p className="text-sm text-gray-700">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <footer className="flex justify-center">
          <Button
            className="w-full bg-primary-800"
            asChild
          >
            <Link href={`${pathname}/validate-pay`}>Comenzar postulación</Link>
          </Button>
        </footer>
      </section>
    </main>
  )
}
