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
import { IConvocatory } from '@/types/admission'
import Link from 'next/link'

export const historycolumns: ColumnDef<IConvocatory>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'description',
    header: 'CONVOCATORIA',
  },
  {
    accessorKey: 'start_date',
    header: 'FECHA DE REGISTRO',
  },
  // {
  //     accessorKey: 'programs',
  //     header: 'PROGRAMA OFRECIDOS',
  //     cell: ({ row }) => {
  //         const { programs } = row.original;

  //         return (
  //             <>
  //                 {Array.isArray(programs) && programs.length > 0 ? (
  //                     <ul className="list-inside">
  //                         {programs.map((program) => (
  //                             <li key={program.program_type} className="text-xs">
  //                                 <span className="text-xs">{program.program_type}:</span> {program.count}
  //                             </li>
  //                         ))}
  //                     </ul>
  //                 ) : (
  //                     <span className="text-xs">
  //                         Sin programas asignados
  //                     </span>
  //                 )}
  //             </>
  //         );
  //     }
  // },
  {
    accessorKey: 'period_uuid',
    header: 'PERIODO DE VIGENCIA',
    cell: ({ row }) => {
      const { start_date, end_date } = row.original
      return (
        <span>
          {start_date.toString()} - {end_date.toString()}
        </span>
      )
    },
  },
  {
    accessorKey: 'is_active',
    header: 'ESTADO',
    cell: ({ row }) => {
      const { is_active } = row.original

      return (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${
            is_active === true
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
          }`}
        >
          {is_active === true ? 'Activo' : 'Inactivo'}
        </span>
      )
    },
  },
  {
    accessorKey: 'actions',
    header: 'ACCIONES',
    enableHiding: false,
    cell: ({ row }) => {
      const { uuid } = row.original

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
              <Link href={`/admin/convocatorias/${uuid}`}>Detalles</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
