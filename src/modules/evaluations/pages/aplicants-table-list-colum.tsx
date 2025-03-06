'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export interface IAplicants {
  id: number;
  postulant: string;
  contact: string;
  status: "Evaluado" | "No evaluado";
  registerDate: string;
}

export const aplicantsColumn: ColumnDef<IAplicants>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
  },
  {
    accessorKey: 'postulant',
    header: 'POSTULANTE',
  },
  {
    accessorKey: 'contact',
    header: 'CONTACTO',
  },
  {
    accessorKey: 'registerDate',
    header: 'F. REGISTRO',
  },
  {
    accessorKey: 'status',
    header: 'ESTADO',
    cell: ({ row }) => {
      const { status } = row.original;

      return (
        <span
          className={`px-2 py-1 text-xs font-semibold rounded-full ${status === 'Evaluado'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
            }`}
        >
          {status}
        </span>
      );
    }
  },
  {
    accessorKey: 'actions',
    header: 'ACCIONES',
    enableHiding: false,
    cell: ({
      // row 
    }) => {
      // const { id } = row.original

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
            <DropdownMenuItem>Detalles</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]
