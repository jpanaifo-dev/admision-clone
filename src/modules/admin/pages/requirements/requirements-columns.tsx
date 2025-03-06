'use client'

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import type { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { IRequirement } from "@/types/admission/IRequirement";
import { DimensionCell } from "./dimention-cell";

export const requirementsColumns: ColumnDef<IRequirement>[] = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    {
        accessorKey: 'name',
        header: 'NOMBRE',
    },
    {
        accessorKey: 'description',
        header: 'DESCRIPCION',
        cell: ({ row }) => {
            const { description } = row.original;

            return (
                <div
                    dangerouslySetInnerHTML={{
                        __html: description.replace(/(?:\r\n|\r|\n)/g, ' ')
                    }}
                />
            );
        }
    },
    {
        accessorKey: 'dimension_requirement',
        header: 'DIMENSION',
        cell: ({ row }) => {
            const { dimension_requirement } = row.original;
            return (
                <DimensionCell dimensionId={dimension_requirement} />
            );
        }
    },
    {
        accessorKey: 'is_active',
        header: 'ESTADO',
        cell: ({ row }) => {
            const { is_active } = row.original;

            return (
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${is_active === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {is_active === true ? 'Activo' : 'Inactivo'}
                </span>
            );
        }
    },
    {
        accessorKey: 'actions',
        header: 'ACCIONES',
        enableHiding: false,
        cell: ({ row }) => {
            const { id } = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-full p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem
                            asChild
                        >
                            <Link href={`
                                /admin/convocatorias/requisitos/agregar?edit=${id}`}>
                                Editar
                            </Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        }
    },
];