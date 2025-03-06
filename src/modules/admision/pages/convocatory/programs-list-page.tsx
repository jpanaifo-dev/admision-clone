'use client'
import { ProgramCard } from '../../components'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { IProgramCallList, IProgramTypeCall } from '@/types/admission'
import { usePathname } from 'next/navigation'
import { useFilterFromUrl } from '@/lib/filter-url'
import { IResApi } from '@/types'
import { useDebouncedCallback } from 'use-debounce'
import { Search } from 'lucide-react'
import { NoResults } from '@/modules/app'

interface IProps {
  programs: IResApi<IProgramCallList>
  programs_type: IProgramTypeCall[]
}

export const ProgramListPage = ({ programs, programs_type }: IProps) => {
  const { getParams, updateFilter } = useFilterFromUrl()
  const pathname = usePathname()

  const typeProgram = getParams({
    key: 'type',
    value: '',
  })

  const query = getParams({
    key: 'query',
    value: '',
  })

  const isEmtpy = programs && programs?.results?.length === 0

  const debounced = useDebouncedCallback((value: string) => {
    updateFilter({
      query: value,
    })
  }, 500)

  return (
    <main className="space-y-4 container">
      <div className="flex flex-col sm:flex-row justify-between space-y-2 sm:space-y-0 sm:space-x-4 pt-8">
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="space-y-2">
              <div className="relative">
                <Input
                  className="peer pe-9 ps-9"
                  type="search"
                  placeholder="Buscar programas..."
                  defaultValue={query}
                  onChange={(e) => debounced(e.target.value)}
                />
                <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                  <Search
                    size={16}
                    strokeWidth={2}
                  />
                </div>
              </div>
            </div>
            <Select
              value={typeProgram}
              onValueChange={(value) =>
                updateFilter({
                  type: value,
                })
              }
            >
              <SelectTrigger className="w-[260px]">
                <SelectValue placeholder="Tipo de programa" />
              </SelectTrigger>
              <SelectContent>
                {programs_type.map((program_type) => (
                  <SelectItem
                    key={program_type.program_type.toLowerCase()}
                    value={program_type.program_type.toLowerCase()}
                  >
                    {program_type.program_type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {
        <NoResults
          isActive={isEmtpy}
          title="NO HAY RESULTADOS"
          message="No se encontraron resultados para la búsqueda realizada. Por favor, intenta con otra búsqueda."
          imageSrc="/svg/not-program.svg"
        />
      }
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 pb-8">
        {!isEmtpy &&
          programs?.results?.map((program) => (
            <ProgramCard
              key={program.id}
              programCall={program}
              href={`${pathname}/${program.program?.study_plan?.uuid}?sede=${program.headquarter?.uuid}`}
            />
          ))}
      </div>
    </main>
  )
}
