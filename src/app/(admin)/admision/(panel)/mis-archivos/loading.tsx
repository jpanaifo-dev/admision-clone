// import { BreadcrumbCustom } from '@/components/app'
import React from 'react'

export default function Loading() {
  return (
    <article className="bg-gray-50">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 min-h-[calc(100vh-64px)] flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Visualizar documento
          </h1>
          <button className="px-4 py-2 bg-gray-300 rounded-lg animate-pulse text-gray-700">
            Descargar PDF
          </button>
        </div>
        <div className="grid grid-cols-12 gap-4">
          {/* Sidebar */}
          <aside className="col-span-12 md:col-span-4 lg:col-span-3 bg-white shadow rounded-lg p-4">
            <div className="flex flex-col gap-4">
              <div className="h-10 bg-gray-300 rounded-lg animate-pulse"></div>
              <div className="flex flex-col gap-3">
                {Array(3)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      key={index}
                      className="h-12 bg-gray-300 rounded-lg animate-pulse"
                    />
                  ))}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <section className="col-span-12 md:col-span-8 lg:col-span-9 bg-white shadow rounded-lg p-4 flex flex-col gap-4">
            <div className="h-8 w-3/4 bg-gray-300 rounded-lg animate-pulse"></div>
            <div className="h-[400px] bg-gray-300 rounded-lg animate-pulse"></div>
          </section>
        </div>
      </main>
    </article>
  )
}
