'use client';

import { useState } from 'react';
import { CustomSelectInput, DatePickerCustom, FormField, HeaderSection } from "@/components/app";
import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { Input } from '@/components/ui/input';
import { statusLabels } from '@/lib/constants';
import { Label } from '@/components/ui/label';
// import * as z from "zod"
// import { useForm } from "react-hook-form"
// import { zodResolver } from "@hookform/resolvers/zod"

interface IRow {
    id: number;
    description: string;
    startDate: string;
    endDate: string;
    status: string;
}

// const formSchema = z.object({
//     description: z.string(),
//     startDate: z.coerce.date(),
//     endDate: z.coerce.date(),
//     status: z.string()
// });

export default function CreateAdmissionStep() {
    const [rows, setRows] = useState<IRow[]>([
        { id: 1, description: '', startDate: '', endDate: '', status: 'Activo' },
    ]);

    // const form = useForm<z.infer<typeof formSchema>>({
    //     resolver: zodResolver(formSchema),
    //     defaultValues: {
    //         "startDate": new Date(),
    //         "endDate": new Date()
    //     },
    // })

    // function onSubmit(values: z.infer<typeof formSchema>) {
    //     try {
    //         console.log(values);
    //     } catch (error) {
    //         console.error("Form submission error", error);
    //     }
    // }

    const handleAddRow = () => {
        const newRow: IRow = {
            id: rows.length + 1,
            description: '',
            startDate: '',
            endDate: '',
            status: 'Activo',
        };
        setRows([...rows, newRow]);
    };

    const handleDeleteRow = () => {
        if (rows.length > 1) {
            setRows(rows.slice(0, -1));
        }
    };

    const handleChange = (id: number, field: keyof IRow, value: string) => {
        setRows(rows.map(row => row.id === id ? { ...row, [field]: value } : row));
    };

    return (
        <>
            <HeaderSection
                title="Crea el cronograma para la convocatoria"
                description={`Registra el cronograma de la convocatoria. Desde { date } hasta el { date }`}
                disabledActions
            />
            <section className="flex flex-col md:flex-row gap-4 mb-4">
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleAddRow}
                >
                    <Plus /> Agregar fila
                </Button>
                <Button
                    type="button"
                    variant="secondary"
                    onClick={handleDeleteRow}
                >
                    <Minus /> Eliminar fila
                </Button>
            </section>
            <div className="space-y-4">
                <div className='hidden lg:block'>
                    <section className='grid grid-cols-4 gap-4 items-center'>
                        <Label>Descripción</Label>
                        <Label>Fecha de inicio</Label>
                        <Label>Fecha de fin</Label>
                        <Label>Estado</Label>
                    </section>
                </div>

                {rows.map((row) => (
                    <div key={row.id} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                        <FormField label="Descripción">
                            <Input
                                type="text"
                                placeholder="Descripción"
                                value={row.description}
                                onChange={(e) => handleChange(row.id, "description", e.target.value)}
                            />
                        </FormField>
                        <FormField label="Fecha de inicio">
                            <DatePickerCustom
                                value={new Date(row.startDate)}
                                onChange={(date) => handleChange(row.id, 'startDate', (date instanceof Date ? date.toISOString() : ''))}
                                placeholder='Fecha de inicio'
                                className='w-full min-w-[200px]'
                            />
                        </FormField>
                        <FormField label="Fecha de fin">
                            <DatePickerCustom
                                value={new Date(row.endDate)}
                                onChange={(date) => handleChange(row.id, 'endDate', (date instanceof Date ? date.toISOString() : ''))}
                                placeholder='Fecha de fin'
                                className='w-full min-w-[200px]'
                            />
                        </FormField>
                        <FormField label="Estado">
                            <CustomSelectInput
                                options={statusLabels}
                                placeholder="Estado"
                                value={row.status}
                                onChange={(value) => handleChange(row.id, 'status', value)}
                            />
                        </FormField>
                    </div>
                ))}
            </div>
        </>
    );
}
