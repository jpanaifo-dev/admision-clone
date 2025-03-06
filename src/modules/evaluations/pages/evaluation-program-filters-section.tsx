import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export const EvaluationProgramFiltersSection = () => {
  return (
    <section className="flex flex-wrap items-center justify-between gap-4">
      <Select defaultValue="maestria">
        <SelectTrigger className="w-[200px] bg-white">
          <SelectValue placeholder="Tipo programa" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="maestria">Maestría</SelectItem>
          <SelectItem value="doctorado">Doctorado</SelectItem>
          <SelectItem value="especializacion">Especialización</SelectItem>
        </SelectContent>
      </Select>

      <div className="flex items-center gap-2">
        <Select defaultValue="todos">
          <SelectTrigger className="w-[150px] bg-white">
            <SelectValue placeholder="Tipo búsqueda" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="nombre">Nombre</SelectItem>
            <SelectItem value="codigo">Código</SelectItem>
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
    </section>
  )
}
