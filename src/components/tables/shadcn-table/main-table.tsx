'use client'
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'
import * as React from 'react'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DataTablePagination,
  IDataTablePaginationProps,
} from './data-table-pagination'
import { TableHeaderCustom } from './table-header-custom'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  hasPagination?: boolean
  hasToolbar?: boolean
  hasSearch?: boolean
  paginationProps?: IDataTablePaginationProps
  valueSearch?: string
  onValueSearch?: (value: string) => void
  onValueSelectedChange?: (value: TData | undefined) => void
  isLoading?: boolean
  searchPlaceholder?: string
  isStriped?: boolean
  childrenHeader?: React.ReactNode
}

export function DataTable<TData, TValue>(props: DataTableProps<TData, TValue>) {
  const {
    columns,
    data,
    hasPagination = true,
    hasToolbar = true,
    hasSearch = false,
    paginationProps,
    onValueSelectedChange,
    onValueSearch,
    valueSearch,
    isLoading = false,
    searchPlaceholder,
    childrenHeader,
    // isStriped = false,
  } = props

  const [rowSelection, setRowSelection] = React.useState({})
  const [selectedRow, setSelectedRow] = React.useState<TData | undefined>(
    undefined
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Si hay paginación, obtenemos los datos de la página actual
  const paginatedData = React.useMemo(() => {
    if (paginationProps) {
      return data
    }
    return data
  }, [data, paginationProps])

  const table = useReactTable({
    data: paginatedData,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      // columnPinning,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    //test pinning columns
    initialState: {
      columnPinning: {
        right: ['actions'],
      },
    },
  })

  // Función para enviar las filas seleccionadas
  // Función para manejar la selección de una fila al hacer clic
  const handleRowClick = (row: TData) => {
    // Al hacer clic en una fila, seleccionamos esa fila
    setSelectedRow(row)
    // Llamamos a la función que pasa la fila seleccionada hacia el exterior
    if (onValueSelectedChange) {
      onValueSelectedChange(row)
    }
  }

  return (
    <div className="space-y-4 bg-transparent">
      {hasToolbar && (
        <TableHeaderCustom
          hasSearch={hasSearch}
          onValueSearch={onValueSearch}
          valueSearch={valueSearch}
          placeholder={searchPlaceholder}
          childrenHeader={childrenHeader}
        />
      )}
      <Table className="w-full border-collapse bg-transparent">
        <TableHeader className="bg-primary-900 sticky top-0 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b uppercase"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={`text-xs text-gray-300 font-semibold truncate bg-primary-900 shadow-md ${header.column.id === 'actions'
                    ? 'sticky right-0 bg-primary-900 shadow-md'
                    : ''
                    }`}
                // style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {/* {table.getTopRows().map((row) => (
              <PinnedRow
                key={row.id}
                row={row}
                table={table}
              />
            ))} */}
          {isLoading ? (
            <>
              {Array.from({ length: 10 }).map((_, index) => (
                <TableRow key={index}>
                  {Array.from({ length: columns.length }, (_, i) => (
                    <TableCell
                      key={i}
                      className="py-2 border-none text-center w-64 max-w-64"
                    >
                      <div className="animate-pulse w-full rounded-md bg-gray-100 h-5 text-xs" />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className={`text-xs hover:bg-gray-100 dark:hover:bg-gray-800 border-none hover:cursor-pointer ${row.original === selectedRow ? 'bg-gray-200' : ''
                  }`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    className={
                      cell.column.id === 'actions'
                        ? 'sticky right-0 bg-gray-100 xl:bg-transparent shadow-md'
                        : ''
                    }
                    key={cell.id}
                    {...(cell.column.id !== 'edit' && {
                      onClick: () => handleRowClick(row.original),
                    })}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={columns.length}
                className="h-24 text-center"
              >
                No se encontraron resultados.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {hasPagination && paginationProps && (
        <DataTablePagination {...paginationProps} />
      )}
    </div>
  )
}
