import React from 'react'

export default function Loading() {
  return (
    <div className="w-full p-4">
      {/* Título */}
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded"></div>

      <div className="w-full overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-gray-100">
              {[
                'Nombre',
                'Fecha',
                'Público',
                'F. de inscripción',
                'Acción',
              ].map((header, index) => (
                <th
                  key={index}
                  className="p-3 text-left text-sm font-medium text-gray-600"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[...Array(3)].map((_, index) => (
              <tr
                key={index}
                className="border-t animate-pulse"
              >
                <td className="p-3">
                  <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
                </td>
                <td className="p-3">
                  <div className="h-4 w-2/3 bg-gray-300 rounded"></div>
                </td>
                <td className="p-3">
                  <div className="h-6 w-16 bg-gray-300 rounded"></div>
                </td>
                <td className="p-3">
                  <div className="h-4 w-6 bg-gray-300 rounded"></div>
                </td>
                <td className="p-3">
                  <div className="h-4 w-4 bg-gray-300 rounded"></div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
