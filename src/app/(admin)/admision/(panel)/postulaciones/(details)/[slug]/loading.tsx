export default function Loading() {
  return (
    <div className="p-6 bg-gray-100 min-h-screen animate-pulse">
      <main className="w-full flex flex-col md:flex-row gap-6 container">
        <div className="flex flex-col gap-6 w-full lg:w-2/3">
          {/* Requisitos */}
          <div className="flex-1 bg-white p-6 rounded-md shadow-md">
            <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-300 rounded w-full"></div>
              <div className="h-4 bg-gray-300 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 rounded w-5/6"></div>
            </div>

            {/* Archivo */}
            <div className="h-4 bg-gray-300 rounded w-32 mt-6 mb-2"></div>
            <div className="flex gap-2 mt-4">
              <div className="h-10 w-40 bg-gray-300 rounded-lg"></div>
              <div className="h-10 w-40 bg-gray-300 rounded-lg"></div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-md shadow-md">
            <div className="h-4 bg-gray-300 rounded w-24 mb-2"></div>
            <div className="h-8 bg-gray-300 rounded w-64 mb-4"></div>

            {/* Tags */}
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-20 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-40 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-28 bg-gray-300 rounded-full"></div>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
              <div className="h-4 w-24 bg-gray-300 rounded"></div>
            </div>

            <div className="flex gap-8">
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
              <div className="h-4 w-48 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
        {/* Información de pago */}
        <div className="w-full lg:w-1/3 bg-gray-200 p-6 rounded-2md shadow-md h-fit">
          <div className="h-6 bg-gray-300 rounded w-40 mb-4"></div>
          <div className="space-y-4">
            <div className="h-4 bg-gray-300 rounded w-48"></div>
            <div className="h-4 bg-gray-300 rounded w-48"></div>
            <div className="h-4 bg-gray-300 rounded w-48"></div>
          </div>
          <div className="h-4 bg-gray-300 rounded w-full mt-6"></div>
        </div>
      </main>
    </div>
  )
}
