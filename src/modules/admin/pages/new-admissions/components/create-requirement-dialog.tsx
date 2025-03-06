'use client'

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Controller, useFormContext } from "react-hook-form"
import { useEffect, useState } from "react"
import { useFilterFromUrl } from "@/lib/filter-url"


export function CreateRequirementDialog() {
    const { getParams, removeFilter, createFilter } = useFilterFromUrl();
    const isEditMode = getParams({ key: "modal", value: "" });
    const [isOpen, setIsOpen] = useState(false);

    const { control, watch, reset, setValue } = useFormContext();

    const noEvaluation = watch("noEvaluation");


    useEffect(() => {
        setIsOpen(isEditMode === "create" || isEditMode.includes("edit"));
    }, [isEditMode]);

    const handleClose = () => {
        setIsOpen(false);
        removeFilter({ key: "modal" });
        reset();
    };

    return (
        <AlertDialog
            open={isOpen}
            onOpenChange={(open) => {
                if (!open) handleClose();
            }}
        >
            <AlertDialogTrigger asChild>
                <Button
                    onClick={() => {
                        createFilter({ key: "modal", value: "create" });
                    }}
                    variant="link"
                    className="text-blue-600 font-normal h-auto p-0"
                >
                    Añadir requisito nuevo
                    <Plus className="h-4 w-4 mr-1" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="sm:max-w-[425px]">
                <AlertDialogHeader>
                    <AlertDialogTitle className="text-2xl">
                        {
                            isEditMode === "create"
                                ? "Crear y asignar requisito"
                                : "Editar requisito"
                        }
                    </AlertDialogTitle>
                    <AlertDialogDescription className="text-sm text-muted-foreground">
                        {
                            isEditMode === "create"
                                ? "Se asignará este requisito a la convocatoria. Marca si se requiere algún tipo de archivo para este requisito."
                                : "Edita los detalles del requisito existente."
                        }
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <section className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <h3 className="text-sm">Este requisito incluye archivos</h3>
                            <div className="flex items-center space-x-2">
                                <Controller
                                    name="acceptsFile"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="accepts-file"
                                            checked={field.value}
                                            onCheckedChange={(checked) => field.onChange(checked as boolean)}
                                        />
                                    )}
                                />
                                <label
                                    htmlFor="accepts-file"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Acepta archivo
                                </label>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <h3 className="text-sm">Porcentaje de calificación</h3>
                            <div className="flex items-center space-x-2">
                                <Controller
                                    name="noEvaluation"
                                    control={control}
                                    render={({ field }) => (
                                        <Checkbox
                                            id="no-evaluation"
                                            checked={field.value}
                                            onCheckedChange={(checked) => {
                                                field.onChange(checked as boolean);
                                                if (checked) setValue("percentage", "0");
                                            }}
                                        />
                                    )}
                                />
                                <label
                                    htmlFor="no-evaluation"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    No requiere evaluación
                                </label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Controller
                                    name="percentage"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            type="number"
                                            {...field}
                                            className="w-24"
                                            min="0"
                                            max="100"
                                            disabled={noEvaluation}
                                        />
                                    )}
                                />
                                <span className="text-sm">%</span>
                            </div>
                        </div>
                    </div>
                </section>
                <AlertDialogFooter>
                    <div className="flex justify-end space-x-2">
                        <AlertDialogCancel
                            onClick={() => handleClose()}
                        >
                            Cancelar
                        </AlertDialogCancel>
                        <AlertDialogAction
                            onClick={() => {
                                handleClose();
                            }}
                            className="bg-primary-900 hover:bg-primary-800"
                        >
                            {isEditMode === "create" ? "Crear" : "Guardar"}
                        </AlertDialogAction>
                    </div>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
