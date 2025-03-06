import { Search } from 'lucide-react'

interface TableHeaderProps {
  valueSearch?: string
  onValueSearch?: (value: string) => void
  hasSearch?: boolean
  placeholder?: string
  childrenHeader?: React.ReactNode
}

export const TableHeaderCustom = (props: TableHeaderProps) => {
  const { valueSearch, onValueSearch, hasSearch, placeholder, childrenHeader } =
    props

  return (
    <main className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <section className="w-full">
        {childrenHeader && <header>{childrenHeader}</header>}
      </section>
      {hasSearch && (
        <main>
          <section className="flex items-center space-x-2 border rounded-md border-gray-200 py-1.5 px-3 max-w-sm bg-white">
            <div>
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              placeholder={placeholder || 'Buscar...'}
              value={valueSearch}
              onChange={(e) => onValueSearch && onValueSearch(e.target.value)}
              className="w-[150px] lg:w-[250px] focus:outline-none"
            />
          </section>
        </main>
      )}
    </main>
  )
}