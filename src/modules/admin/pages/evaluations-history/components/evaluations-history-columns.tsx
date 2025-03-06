'use client'

import type { ColumnDef } from '@tanstack/react-table'
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { StudentData } from '@/data/student-data';

export const evaluationsHistoryColumns: ColumnDef<StudentData>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'POSTULANTE',
    },
    {
        accessorKey: 'program',
        header: 'PROGRAMA',
    },
    {
        accessorKey: 'plan',
        header: 'PLAN DE ESTUDIOS',
    },
    {
        accessorKey: 'convocatory',
        header: 'CONVOCATORIA',
    },
    {
        accessorKey: 'email',
        header: 'CONTACTO',
    },
    {
        accessorKey: 'actions',
        header: 'ACCIONES',
        cell: ({
            // row 
        }) => {
            // const id = row.original.id;

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
            );
        },
    }
]