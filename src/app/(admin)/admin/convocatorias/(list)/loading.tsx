export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  )
}

const SkeletonCard = () => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-full animate-pulse">
      {/* Header */}
      <div className="flex items-center space-x-3">
        <div className="h-10 w-10 bg-gray-300 rounded-full"></div>
        <div className="h-4 w-32 bg-gray-300 rounded"></div>
      </div>

      {/* Contenido */}
      <div className="mt-4 space-y-2">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      </div>

      {/* Botones */}
      <div className="mt-4 flex space-x-2">
        <div className="h-8 w-24 bg-gray-300 rounded"></div>
        <div className="h-8 w-20 bg-gray-300 rounded"></div>
      </div>
    </div>
  )
}
