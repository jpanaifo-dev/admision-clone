'use client'


// import { Button } from "@/components/ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
// import type { ColumnDef } from "@tanstack/react-table";
// import { MoreHorizontal } from "lucide-react";
// import { ITicket } from "@/core/index"
// import { format } from "date-fns";
// import { Badge } from "@/components/ui/badge";
// import { TicketValidation } from "./ticket-validation";

export const reportscolumns = [
    {
        accessorKey: 'id',
        header: 'ID',
    },
    // {
    //     accessorKey: 'is_winner',
    //     header: 'GANADOR',
    //     cell: ({ row }) => <div>
    //         <Badge className={`${row.original. ? 'bg-green-200 text-black' : 'bg-red-100 text-black'}`}>
    //             {row.original.buyer_name ? 'Si' : 'No'}
    //         </Badge>
    //     </div>
    // },
    {
        accessorKey: 'period_name',
        header: 'NOMBRE DEL PERIODO',
    },
    {
        accessorKey: 'plan_name',
        header: 'NOMBRE DEL PLAN',
    },
    {
        accessorKey: 'convocatory',
        header: 'CONVOCATORIA',
    },
    {
        accessorKey: 'group',
        header: 'GRUPO',
    },
    {
        accessorKey: 'cant_students',
        header: 'CANTIDAD DE ALUMNOS',
    },
    {
        accessorKey: 'period_vigent',
        header: 'PERIODO DE VIGENCIA',
    },
    {
        accessorKey: 'is_active',
        header: 'ACTIVO',
    },
    {
        accessorKey: 'actions',
        header: 'Acciones',
    }
    // {
    //     accessorKey: 'is_active',
    //     header: 'ACTIVO',
    //     cell: ({ row }) => <div>
    //         <Badge className={`${row.original.is_active ? 'bg-green-200 text-black' : 'bg-red-100 text-black'}`}>
    //             {row.original.is_active ? 'Si' : 'No'}
    //         </Badge>
    //     </div>
    // },
    // {
    //     accessorKey: 'is_paid',
    //     header: 'PAGADO',
    //     cell: ({ row }) => <div>
    //         <Badge className={`${row.original.is_paid ? 'bg-green-200 text-black' : 'bg-red-100 text-black'}`}>
    //             {row.original.is_paid ? 'Si' : 'No'}
    //         </Badge>
    //     </div>
    // },
    // {
    //     accessorKey: 'sale_date',
    //     header: 'FECHA DE VENTA',
    //     cell: ({ row }) => <div>
    //         {format(new Date(row.original.sale_date), 'dd/MM/yyyy')}
    //     </div>,
    // },
    // {
    //     accessorKey: 'total_paid',
    //     header: 'TOTAL PAGADO',
    //     cell: ({ row }) => <div className="text-end">
    //         {`s/. ${row.original.total_paid.toFixed(2)}`}
    //     </div>
    // },
    // {
    //     accessorKey: 'raffle',
    //     header: 'RIFA',
    //     cell: ({ row }) => <div>
    //         {typeof row.original.raffle === 'object' ? row.original.id : row.original.id}
    //     </div>
    // },
    // {
    //     accessorKey: 'actions',
    //     header: 'ACCIONES',
    //     enableHiding: false,
    //     cell: ({ row }) => {
    //         const { id, is_paid } = row.original;  // Extrae is_paid desde row.original

    //         const handleStatusChange = (newStatus: boolean) => {
    //             console.log('Nuevo estado de validación:', newStatus);
    //             // Aquí puedes hacer cualquier otra lógica que dependa del cambio de estado.
    //         };

    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant="ghost" className="h-8 w-full p-0">
    //                         <span className="sr-only">Open menu</span>
    //                         <MoreHorizontal className="h-4 w-4" />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align="end">
    //                     <TicketValidation
    //                         ticketId={id}        // Pasamos el id del ticket
    //                         is_paid={is_paid}    // Pasamos is_paid en lugar de validated
    //                         onStatusChange={handleStatusChange}  // Función para manejar el cambio de estado
    //                     />
    //                     <DropdownMenuItem>Imprimir</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         );
    //     }
    // },
];