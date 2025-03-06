/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { type Column } from '@tanstack/react-table'
import { ChevronDown } from 'lucide-react'

export interface IStatusOption {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

type TableToolbarProps = {
  statusOptions?: string[]
  selectedStatusOption?: string | null
  onStatusChange?: (status: string) => void
  hasSearch?: boolean
  searchValue?: string
  onSearchChange?: (searchValue: string) => void
  rowsPerPage?: number[]
  pageSize: number
  onPageSizeChange?: (pageSize: number) => void
  columns: Column<any, unknown>[]
}

export function TableToolbar(props: TableToolbarProps) {
  const {
    statusOptions,
    selectedStatusOption,
    onStatusChange,
    hasSearch,
    searchValue,
    onSearchChange,
    rowsPerPage,
    pageSize,
    onPageSizeChange,
    columns,
  } = props
  return (
    <section className="flex items-center justify-between gap-2 py-4">
      {statusOptions &&
        statusOptions.map((status) => (
          <Button
            key={status}
            variant={status === selectedStatusOption ? 'default' : 'ghost'}
            onClick={() => onStatusChange?.(status)}
          >
            {status}
          </Button>
        ))}
      {hasSearch && (
        <Input
          placeholder={'Search...'}
          value={searchValue}
          onChange={(event) => onSearchChange?.(event.target.value)}
        />
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="ml-auto"
          >
            Columns <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {columns
            .filter((column) => column.getCanHide())
            .map((column) => (
              <DropdownMenuCheckboxItem
                key={column.id}
                className="capitalize"
                checked={column.getIsVisible()}
                onCheckedChange={(value) => column.toggleVisibility(!!value)}
              >
                {column.id}
              </DropdownMenuCheckboxItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {rowsPerPage && (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Rows per page: {pageSize} <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {rowsPerPage.map((item) => (
              <DropdownMenuCheckboxItem
                key={item}
                checked={pageSize === item}
                onCheckedChange={() => onPageSizeChange?.(item)}
              >
                {item}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      )}
    </section>
  )
}