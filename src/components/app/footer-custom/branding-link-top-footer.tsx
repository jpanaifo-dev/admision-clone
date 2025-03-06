import React from 'react'
import Link from 'next/link'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'

export const BrandingLinkTopFooter = () => {
  return (
    <footer className="bg-gray-100 border-t">
      <div className="relative container pt-16 lg:pt-24 pb-4">
        <div className="absolute end-4 top-4 sm:end-6 sm:top-6 lg:end-8 lg:top-8">
          <a
            className="inline-block rounded-full bg-primary-800 p-2 text-white shadow transition hover:bg-teal-500 sm:p-3 lg:p-4"
            href="#"
          >
            <span className="sr-only">Back to top</span>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="size-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>

        <div className="lg:flex lg:items-end lg:justify-between">
          <div>
            <div className="flex justify-center lg:justify-start">
              <Link
                href={ADMISSION_URLS_APP.HOME.URL_BASE}
                className="flex items-center gap-2 w-fit hover:cursor-pointer"
              >
                <img
                  src="/brands/escudo-epg.webp"
                  alt="logo-epg"
                  className="w-6 h-10"
                />
                <h1 className="w-32 min-w-32 font-bold text-xs text-primary-800">
                  ESCUELA DE POSTGRADO UNAP
                </h1>
              </Link>
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-gray-500 lg:text-left">
              Escuela de Postgrado de la Universidad Nacional de la Amazonía
              Peruana. Av. Abelardo Quiñones Km. 2.5, Iquitos, Perú. Teléfono:
              (065) 26-0000 Anexo 1101.
            </p>
          </div>

          <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:mt-0 lg:justify-end lg:gap-12">
            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75"
                href={ADMISSION_URLS_APP.HOME.URL_BASE}
              >
                Inicio
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75"
                href={ADMISSION_URLS_APP.CONVOCATION.URL_BASE}
              >
                Convoctorias{' '}
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75"
                href={ADMISSION_URLS_APP.APPLICATION.URL_BASE}
              >
                Postulaciones
              </a>
            </li>

            <li>
              <a
                className="text-gray-700 transition hover:text-gray-700/75"
                href={ADMISSION_URLS_APP.PROFILE.URL_BASE}
              >
                Perfil
              </a>
            </li>
          </ul>
        </div>

        <p className="mt-12 text-center text-sm text-gray-500 lg:text-right">
          Copyright &copy;
          {new Date().getFullYear()}
          All rights reserved.
        </p>
      </div>
    </footer>
  )
}
