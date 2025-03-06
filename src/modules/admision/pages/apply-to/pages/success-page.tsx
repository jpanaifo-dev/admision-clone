'use client'
import { Button } from '@/components/ui/button'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import Link from 'next/link'
import React from 'react'

// const TERMS = [
//   'Su postulación ha sido enviada correctamente',
//   'Tus datos han sido enviados correctamente',
// ]

export const SuccessPage = () => {
  return (
    <div
      className="min-h-screen relative bg-cover bg-center bg-no-repeat flex items-center justify-center px-4 py-16"
      style={{
        backgroundImage:
          'linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url("https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
      }}
    >
      <div className="max-w-3xl w-full text-center text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
          TU POSTULACIÓN FUE ENVIADA CORRECTAMENTE
        </h1>

        <p className="text-lg md:text-xl mb-8 text-gray-200">
          Tus datos han sido enviados correctamente
        </p>

        <div className="flex flex-col items-center gap-6">
          <footer className="flex flex-row gap-4">
            <Button
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              asChild
            >
              <Link href={ADMISSION_URLS_APP.HOME.URL_BASE}>Ir a inicio</Link>
            </Button>
            <Button
              variant="ghost"
              className="border hover:bg-gray-950/60 text-white rounded-lg font-medium transition-colors hover:text-white"
              asChild
            >
              <Link href={ADMISSION_URLS_APP.APPLICATION.URL_BASE}>
                consultar historial
              </Link>
            </Button>
          </footer>
        </div>
      </div>
    </div>
  )
}
