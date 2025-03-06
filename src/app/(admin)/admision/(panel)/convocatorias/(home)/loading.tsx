import React from 'react'

export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 container">
      {/* Lista de convocatorias */}
      <div className="w-full md:w-1/3 space-y-4">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="p-4 bg-white rounded-lg shadow animate-pulse"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
              <div>
                <div className="w-16 h-4 bg-gray-300 rounded"></div>
                <div className="w-32 h-6 bg-gray-400 rounded mt-2"></div>
              </div>
            </div>
            <div className="w-full h-4 bg-gray-200 rounded mt-3"></div>
          </div>
        ))}
      </div>
      {/* Panel de detalles */}
      <div className="w-full sm:w-2/3 p-6 bg-white rounded-lg shadow animate-pulse">
        <div className="w-48 h-6 bg-gray-400 rounded"></div>
        <div className="w-full h-4 bg-gray-200 rounded mt-3"></div>
        <div className="w-3/4 h-4 bg-gray-200 rounded mt-2"></div>
        <div className="w-2/3 h-4 bg-gray-200 rounded mt-2"></div>
      </div>
    </div>
  )
}
