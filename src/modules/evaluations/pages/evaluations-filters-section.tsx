import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const EvaluationsFiltersSection = () => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* <div className="flex items-center gap-2 rounded-lg border bg-white px-3 py-2">
        <svg
          className="h-4 w-4 text-gray-500"
          fill="none"
          height="24"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            height="18"
            rx="2"
            ry="2"
            width="18"
            x="3"
            y="4"
          />
          <line
            x1="16"
            x2="16"
            y1="2"
            y2="6"
          />
          <line
            x1="8"
            x2="8"
            y1="2"
            y2="6"
          />
          <line
            x1="3"
            x2="21"
            y1="10"
            y2="10"
          />
        </svg>
        <span className="text-sm text-gray-500">Fecha de creación</span>
      </div> */}
      <Input
        type="date"
        className="w-full md:w-[200px]"
      />

      <Select defaultValue="activas">
        <SelectTrigger className="w-[130px] border-0 bg-white">
          <SelectValue placeholder="Estado" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="activas">Activas</SelectItem>
          <SelectItem value="inactivas">Inactivas</SelectItem>
          <SelectItem value="todas">Todas</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex-1" />

      <Select defaultValue="todos">
        <SelectTrigger className="w-[130px] border-0 bg-white">
          <SelectValue placeholder="Tipo búsqueda" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="todos">Todos</SelectItem>
          <SelectItem value="admision">Admisión</SelectItem>
          <SelectItem value="traslado">Traslado</SelectItem>
          <SelectItem value="postgrado">Postgrado</SelectItem>
        </SelectContent>
      </Select>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
        <Input
          className="w-[280px] pl-9"
          placeholder="Buscar ..."
          type="search"
        />
      </div>
    </div>
  )
}
