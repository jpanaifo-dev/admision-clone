import Image from 'next/image'
import React from 'react'

export default function Loading() {
  return (
    <main className="absolute top-0 bottom-0 left-0 right-0 z-50 h-screen bg-white">
      <section className="container mx-auto py-20 h-full flex flex-col justify-center items-center">
        <div className="flex flex-col justify-center items-center h-fit">
          <div>
            <Image
              alt="Loading"
              src="/svg/Next steps-pana.svg"
              width={320}
              height={320}
            />
          </div>
          <h3 className="text-xl lg:text-4xl font-semibold text-primary-800 animate-pulse">
            Espere un momento...
          </h3>
        </div>
      </section>
    </main>
  )
}
