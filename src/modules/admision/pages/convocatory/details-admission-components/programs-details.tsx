"use client";

import { InputSearch } from "@/components/app";
import { SelectFilter } from "@/components/app/filters";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronRight, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ExternalLinkButton } from "./components/external-link";

interface Program {
    title: string;
    period: string;
    dateRange: string;
}

const programs: Program[] = [
    {
        title: "Maestría en panaderia termonuclear",
        period: "Plan de estudio 2024-II",
        dateRange: "Desde el 20 de febrero 2024 al 28 de marzo 2024",
    },
    {
        title: "Maestría en marketing espacial",
        period: "Plan de estudio 2024-II",
        dateRange: "Desde el 20 de febrero 2024 al 28 de marzo 2024",
    },
    {
        title: "Maestrías en ritmo musical",
        period: "Plan de estudio 2024-II",
        dateRange: "Desde el 20 de febrero 2024 al 28 de marzo 2024",
    },
];

const filters = [
    { value: "active", label: "Activo" },
    { value: "inactive", label: "Inactivo" },
    { value: "pending", label: "Pendiente" },
    { value: "canceled", label: "Cancelado" },
];

interface IProps {
    uuid?: string;
}

export const ProgramsDetail = (props: IProps) => {
    const {  } = props;
    const pathname = usePathname();
    
    return (
        <main className="flex flex-col gap-y-4">
            <section className="flex md:flex-row gap-4 overflow-x-auto scrollbar-hide">
                <InputSearch placeholder="Buscar" />
                <div className="flex gap-4">
                    <SelectFilter filterKey="status" data={filters} />
                </div>
                <div className="flex gap-4">
                    <Button variant={"ghost"} className="flex gap-x-2">
                        <Plus /> Agregar requisitos globales{" "}
                    </Button>
                </div>
                <ExternalLinkButton href={`${pathname}/programas/`} />
            </section>
            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {programs.map((program) => (
                    <Card
                        className="transition-colors max-w-screen-sm"
                        key={program.title}
                    >
                        <CardContent className="p-4">
                            <Badge className="text-sm text-gray-500 bg-gray-100 hover:bg-primary-100">
                                {program.period}
                            </Badge>
                            <h2 className="text-lg font-bold mt-1 text-primary-800">
                                {program.title}
                            </h2>
                            <div className="flex gap-y-2 mt-2 justify-between">
                                <p className="text-sm text-gray-600 mt-2">
                                    {program.dateRange}
                                </p>
                                <Link href={`${pathname}/${program.title}`}>
                                    <Button variant="outline" className="flex gap-x-2">
                                        <ChevronRight />
                                    </Button>
                                </Link>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </section>
        </main>
    );
};
