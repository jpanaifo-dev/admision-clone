export default function Loading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Título */}
      <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
      <div className="h-4 w-2/3 bg-gray-300 rounded"></div>

      {/* Campos del formulario */}
      {[...Array(5)].map((_, index) => (
        <div
          key={index}
          className="space-y-2"
        >
          <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
          <div className="h-10 w-full bg-gray-300 rounded"></div>
        </div>
      ))}

      {/* Botón toggle */}
      <div className="flex items-center space-x-4">
        <div className="h-5 w-10 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-1/4 bg-gray-300 rounded"></div>
      </div>

      {/* Botón de guardar */}
      <div className="h-10 w-1/3 bg-gray-300 rounded"></div>
    </div>
  )
}
