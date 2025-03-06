import React from 'react'
import { Button } from '@/components/ui/button'
import { Check } from 'lucide-react'
import Link from 'next/link'
import { LANDINGS_URLS_APP } from '@/config/urls-data/admission.urls.config'
// import Link from 'next/link'

export default function Page() {
  return (
    <main>
      <section id="landing-payment">
        <div className="w-full bg-white">
          <div className="container mx-auto px-4 pt-12">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-6">
                <p className="text-red-950 font-medium">Realiza tus pagos</p>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 leading-tight">
                  Te orientamos a realizar tus pagos de forma segura
                </h1>
                <p className="text-gray-600 text-lg">
                  Recuerda que puedes realizar tus pagos de forma segura y
                  rápida a través de las plataformas del Banco de la Nación.
                </p>
                <div className="flex flex-wrap gap-4 pt-4">
                  <Button
                    variant="outline"
                    className="rounded-full"
                    asChild
                  >
                    <Link
                      href={`${LANDINGS_URLS_APP.PAYMENTS.URL_BASE}#how-to-pay`}
                    >
                      Atraves de Págalo.pe
                    </Link>
                  </Button>
                  <Button className="rounded-full bg-[#0070BA] hover:bg-[#003087] text-white">
                    De forma presencial
                  </Button>
                </div>
              </div>
              <div className="relative">
                <img
                  src="/landing/payment_landing.webp"
                  alt="Marketplace interface mockup"
                  className="w-full h-full object-cover max-w-xl rounded-lg"
                  width={230}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        id="how-to-pay"
        className="w-full bg-gray-50"
      >
        <div className="container mx-auto px-4 py-16 md:py-28 space-y-32">
          {/* First Section */}
          <div
            className="grid lg:grid-cols-2 gap-12 items-center"
            id="pay-to-pagalo"
          >
            <div className="relative">
              <div className="absolute -z-10 w-[500px] h-[500px] bg-sky-100 rounded-full blur-3xl opacity-60 -translate-x-1/4 -translate-y-1/4" />
              <iframe
                width={500}
                height={400}
                className="w-full"
                src="https://www.youtube.com/embed/ARjARdM-BQw?si=qHcif61Tvx-IqruA&amp;start=6"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
            <div className="space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                Guía para Realizar Pagos a través de Pagalo.pe
              </h2>
              <div className="space-y-4">
                {[
                  'Crea una cuenta en Pagalo.pe del Banco de la Nación.',
                  'Busca la institución a la que deseas realizar el pago.',
                  'Completa los datos solicitados y confirma el pago.',
                ].map((text, i) => (
                  <div
                    key={i}
                    className="flex gap-3"
                  >
                    <Check className="h-6 w-6 text-[#7e1c24] shrink-0" />
                    <p className="text-gray-600">{text}</p>
                  </div>
                ))}
              </div>
              <Button className="text-white rounded-full bg-[#7e1c24] hover:bg-[#5e1519]">
                Ir a Pagalo.pe
              </Button>
            </div>
          </div>
        </div>
      </section>
      <section
        id="second-payment"
        className="w-full bg-white"
      >
        <div className="container mx-auto px-4 py-16 space-y-32">
          {/* Second Section */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
                  Pagos Presenciales en el Banco de la Nación
                </h2>
                <p className="text-gray-600">
                  Si prefieres realizar tus pagos de manera presencial, puedes
                  hacerlo en cualquier agencia del Banco de la Nación.
                </p>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex gap-3">
                    <Check className="h-6 w-6 text-[#7e1c24] shrink-0" />
                    <h3 className="font-semibold text-gray-900">
                      Dirígete a una agencia del Banco de la Nación
                    </h3>
                  </div>
                  <p className="text-gray-600 pl-9">
                    Encuentra la agencia más cercana a tu ubicación.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-3">
                    <Check className="h-6 w-6 text-[#7e1c24] shrink-0" />
                    <h3 className="font-semibold text-gray-900">
                      Solicita el formato de pago
                    </h3>
                  </div>
                  <p className="text-gray-600 pl-9">
                    El cajero te entregará un recibo que debes conservar como
                    constancia.
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex gap-3">
                    <Check className="h-6 w-6 text-[#7e1c24] shrink-0" />
                    <h3 className="font-semibold text-gray-900">
                      Presenta la constancia donde sea requerido
                    </h3>
                  </div>
                  <p className="text-gray-600 pl-9">
                    Para trámites académicos o administrativos, asegúrate de
                    presentar o enviar una copia según lo solicitado.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button className="text-white rounded-full bg-[#7e1c24] hover:bg-[#5e1519]">
                  Encontrar agencia
                </Button>
                <Button variant="outline" className='rounded-full'>Más información</Button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -z-10 w-[600px] h-[600px] bg-gradient-to-r from-sky-200 to-blue-300 rounded-full blur-3xl opacity-60 -translate-x-1/2 -translate-y-1/2" />
              <img
                src="/placeholder.svg?height=600&width=300"
                alt="Banco de la Nación branch"
                className="w-full max-w-[300px] h-auto mx-auto"
                width={300}
                height={600}
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
