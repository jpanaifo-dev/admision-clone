import Image from 'next/image'
import React from 'react'

export const EmptyConvocatorySchedule = () => {
  return (
    <section className="flex flex-col sm:flex-row gap-6 py-12 sm:py-14 container justify-center">
      <div className="flex flex-col items-center justify-center gap-4 text-center">
        <Image
          src="/svg/do-not-enter.svg"
          alt='Ilustración de una person  a con un megáfono y un cartel que dice "Convocatorias"'
          width={400}
          height={400}
          className="object-cover"
        />
        <div className="flex flex-col items-center justify-center gap-4 text-center max-w-3xl">
          <h3 className="font-black text-5xl lg:text-6xl bg-gradient-to-r from-primary-500 to-primary-800 text-transparent bg-clip-text">
            SIN CONVOCATORIAS DISPONIBLES
          </h3>
          <p className="text-gray-600 font-medium max-w-xl">
            No hay convocatorias disponibles en este momento. Por favor, vuelva
            a intentarlo más tarde.
          </p>
        </div>
      </div>
    </section>
  )
}
