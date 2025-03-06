'use client'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { ColumnDef } from '@tanstack/react-table'
import { MoreHorizontal } from 'lucide-react'
import { IConvocatoryHistory } from './table-history-convocatory'
import Link from 'next/link'

export const historycolumns: ColumnDef<IConvocatoryHistory>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'convocatory_name',
    header: 'CONVOCATORIA',
  },
  {
    accessorKey: 'date_register',
    header: 'FECHA DE REGISTRO',
  },
  {
    accessorKey: 'program_offering',
    header: 'PROGRAMA OFRECIDOS',
  },
  {
    accessorKey: 'period_vigent',
    header: 'PERIODO DE VIGENCIA',
  },
  {
    accessorKey: 'status',
    header: 'ESTADO',
    cell: ({ row }) => {
      const { status } = row.original

      return (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            status === 'Activa'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {status}
        </span>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'ACCIONES',
    enableHiding: false,
    cell: ({ row }) => {
      const { id } = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="h-8 w-full p-0"
            >
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`${''}/${id}`}>Detalles</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
