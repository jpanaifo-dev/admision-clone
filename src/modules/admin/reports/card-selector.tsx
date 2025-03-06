"use client"; // Indica que este es un componente de cliente

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Download, Filter } from "lucide-react";

interface SelectItemProps {
    value: string; // Valor del item
    label: string; // Etiqueta para mostrar
}

interface CardTitlesProps {
    title: string; // Título del card
    subtitle: string; // Subtítulo del card
}

interface SelectProps {
    items: SelectItemProps[]; // Lista de items
    onSelect: (value: string) => void; // Evento para manejar el cambio
    placeholder?: string; // Prop opcional
    value?: string; // Valor actual seleccionado
    icon?: React.ElementType; // Icono opcional
    cardTitles: CardTitlesProps; // Prop opcional
}

export const StudyPlanCard = (props: SelectProps) => {
    const { items, onSelect, placeholder, value, icon: Icon, cardTitles } = props;

    return (
        <Card className="w-full max-w-md p-6">
            <CardHeader className="px-0 pt-0">
                <CardTitle className="text-xl font-bold">{cardTitles?.title}</CardTitle>
                <p className="text-sm text-muted-foreground mt-2">
                    {cardTitles?.subtitle}
                </p>
            </CardHeader>
            <CardContent className="px-0 space-y-6">
                <Select onValueChange={onSelect} defaultValue={value}>
                    <SelectTrigger className="w-full relative ps-14">
                        {Icon && (
                            <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 group-has-[[disabled]]:opacity-50">
                                <Icon strokeWidth={1} />
                            </div>
                        )}
                        <SelectValue placeholder={placeholder || "Seleccione una opción"} />
                    </SelectTrigger>
                    <SelectContent>
                        {items.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                                {item.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <div className="flex justify-end gap-3">
                    <Button variant="default" className="bg-primary-700 text-white">
                        <Download className="h-4 w-4" />
                        Descargar
                    </Button>
                    <Button variant="outline">
                        <Filter className="h-4 w-4" />
                        Filtrar
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
};
