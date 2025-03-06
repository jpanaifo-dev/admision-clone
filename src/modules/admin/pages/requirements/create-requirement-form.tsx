"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { HeaderSection } from "@/components/app";
import { useEffect, useState } from "react";
import { IDimensionRequirement, IRequirement, IRequirementCreate } from "@/types/admission/IRequirement";
import { fetchAdmissionDimensionRequirements } from "@/api/convocatory/dimention-requirement";
import { dimensionDescriptions } from "@/data/dimention-data";
import { createAdmissionRequirement, fetchAdmissionRequirementById, updateAdmissionRequirement } from "@/api/convocatory/requirements";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

const formSchema = z.object({
    name: z.string().nonempty({
        message: "El nombre es requerido"
    }),
    description: z.string().min(3, {
        message: "La descripción debe tener al menos 3 caracteres"
    }),
    is_active: z.boolean().default(true),
    dimension_requirement: z.preprocess(
        (value) => (value ? Number(value) : undefined),
        z.number({ message: "Debes seleccionar una dimensión" })
    )
});

export default function CreateRequirementForm() {
    const searchParams = useSearchParams()
    const id = searchParams.get('edit')
    const isEditMode = Boolean(id);
    const router = useRouter();
    const [dimensionName, setDimensionName] = useState<IDimensionRequirement[]>([]);
    const [requirement, setRequirement] = useState<IRequirement | null>(null);

    const initialData = isEditMode ? requirement : undefined;


    async function fetchRequirementById() {
        try {
            if (id) {
                const res = await fetchAdmissionRequirementById(parseInt(id));
                if (res.data) {
                    setRequirement(res.data);
                    form.reset(res.data
                    );
                } else {
                    console.error("Error al obtener el requisito");
                }
            }
        } catch (error) {
            console.error("Error al obtener el requisito", error);
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: initialData?.name || "",
            description: initialData?.description || "",
            is_active: initialData?.is_active ?? true,
            dimension_requirement: initialData?.dimension_requirement || 0,
        }
    });

    useEffect(() => {
        const fetchDimension = async () => {
            const result = await fetchAdmissionDimensionRequirements();
            setDimensionName(result.data || []);
        };
        fetchDimension();
        fetchRequirementById();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function onSubmit(values: z.infer<typeof formSchema>) {
        try {
            const data: IRequirementCreate = {
                name: values.name,
                description: values.description,
                is_active: values.is_active,
                dimension_requirement: parseInt(values.dimension_requirement.toString()),
            }


            // condicional para actualizar o crear un nuevo requisito
            const res = isEditMode
                ? await updateAdmissionRequirement({ id: parseInt(id!), ...data })
                : await createAdmissionRequirement(data);

            if (res.status === 201) {
                toast.success("Requisito creado correctamente");
                form.reset();
                router.push("/admin/convocatorias/requisitos");
            } else if (res.status === 200) {
                toast.success("Requisito actualizado correctamente");
                router.push("/admin/convocatorias/requisitos");
            }
            else {
                toast.error("Error al crear el requisito");
            }
        } catch (error) {
            console.error("Form submission error", error);
        }
    }

    return (
        <>
            <HeaderSection
                title={`Requisitos generales`}
                description={`En esta sección podrás agregar los requisitos generales de la convocatoria.`}
                disabledActions
            />

            <section className="grid grid-cols-1 gap-8 lg:grid-cols-2 md:gap-12">
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8 max-w-3xl shadow rounded-md bg-white p-4 lg:p-6"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Nombre" type="text" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Descripción</FormLabel>
                                    <FormControl>
                                        <Textarea placeholder="Descripción"
                                            rows={6}
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="dimension_requirement"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Dimensión</FormLabel>
                                    <Select
                                        onValueChange={(value) => field.onChange(Number(value))}
                                        value={String(field.value)}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Selecciona una dimensión" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {dimensionName.map((dimension) => (
                                                <SelectItem key={dimension.id} value={String(dimension.id)}>
                                                    {dimension.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="is_active"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Activo</FormLabel>
                                    <Input
                                        type="checkbox"
                                        checked={field.value}
                                        onChange={field.onChange}
                                        onBlur={field.onBlur}
                                        name={field.name}
                                        ref={field.ref}
                                        className={`w-10 h-10 ${field.value ? "bg-blue-500" : "bg-gray-200"}`}
                                    />
                                    {/* <Select onValueChange={
                                        (value) => field.onChange(value === "true" ? true : false)
                                    }
                                        defaultValue={String(field.value)}>
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Estado" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="true">Activo</SelectItem>
                                            <SelectItem value="false">Inactivo</SelectItem>
                                        </SelectContent>
                                    </Select> */}
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <footer className="fixed bottom-0 w-full flex right-0 justify-center bg-white shadow-lg border-t-1">
                            <div className="flex justify-end py-4 gap-4 w-full px-4 md:px-8 lg:px-16 xl:px-28">
                                <Link href="/admin/convocatorias/requisitos">
                                    <Button variant="outline" type="button">
                                        Cancelar
                                    </Button>
                                </Link>
                                <Button type="submit">
                                    {isEditMode ? "Actualizar" : "Guardar"}
                                </Button>
                            </div>
                        </footer>
                    </form>
                </Form>

                {/* Sección de descripción de las dimensiones */}
                <div className="mb-6 max-w-3xl">
                    <h3 className="text-lg font-semibold mb-4">Acerca de las Dimensiones</h3>
                    <ul className="space-y-4">
                        {dimensionDescriptions.map((dimension) => (
                            <li key={dimension.id} className="bg-white p-4 rounded-md shadow">
                                <h4 className="font-bold text-blue-600">{dimension.name}</h4>
                                <p className="text-gray-600">{dimension.description}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>
        </>
    );
}
