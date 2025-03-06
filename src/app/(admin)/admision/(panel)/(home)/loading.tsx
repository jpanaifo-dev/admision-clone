import React from 'react'

export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      {/* Perfil completado */}
      <div className="bg-green-100 p-4 rounded-lg h-40 w-full"></div>

      {/* Tarjetas de acceso */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-200 h-60 rounded-lg"></div>
        <div className="bg-gray-200 h-60 rounded-lg"></div>
        <div className="bg-gray-200 h-60 rounded-lg"></div>
      </div>

      {/* Próximos eventos y Notificaciones */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="bg-gray-200 h-14 rounded-lg"></div>
          <div className="bg-gray-200 h-14 rounded-lg"></div>
        </div>
        <div className="space-y-4">
          <div className="bg-gray-200 h-14 rounded-lg"></div>
          <div className="bg-gray-200 h-14 rounded-lg"></div>
        </div>
      </div>
    </div>
  )
}
