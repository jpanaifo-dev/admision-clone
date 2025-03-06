import Image from 'next/image'
import React from 'react'

export const EmptyConvocatoryScheduleList = () => {
  return (
    <div className="w-full text-gray-600 h-fit flex flex-col items-center justify-center gap-4 text-center">
      <Image
        src="/svg/schedule-bro.svg"
        alt="No hay eventos programados"
        width={280}
        height={280}
      />
      <h2 className="font-extrabold text-center text-2xl">
        CONVOCATORIA EN CONSTRUCCIÓN
      </h2>
      <p className="text-sm text-gray-500 max-w-sm">
        No hay cronograma programados para esta convocatoria. Por favor, vuelva
        a intentarlo más tarde.
      </p>
    </div>
  )
}
