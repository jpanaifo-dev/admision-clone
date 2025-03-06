"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { Programa, ProgramaBase } from "./types";
import { BottomActions } from "@/components/app/bottom-actions";
import { Button } from "@/components/ui/button";
import {
  IConvocatory,
  IHeadquarter,
  IProgramPlanStudy,
  IStudyPlan,
} from "@/types";
import { IProgramType } from "@/types/program/IProgramType";
import { IKnowledgeArea } from "@/types/program/IKnowledgeArea";
import { IModality } from "@/types/admission/IModality";
import { FilterHeader } from "./filter-header";
import { SpinnerLoadingScreen, ToastCustom } from "@/components/app";
import { toast } from "react-toastify";
import { ProgramaDetails } from "./program-detail";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { createConvocatoryBulk } from "@/api/bulk/promotionconvocatory";
import { IConvocatoryBulkListCreate } from "@/types/admission/IConvocatoryBulkList";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

interface IProps {
  uuid?: string | string[] | undefined;
  planStudy?: IProgramPlanStudy[] | null;
  headquarters?: IHeadquarter[] | null;
  programsTypes?: IProgramType[] | null;
  knowledgeArea?: IKnowledgeArea[] | null;
  modalities?: IModality[] | null;
  convocatory?: IConvocatory[];
}

interface FormValues {
  promotion: string;
  programas: Programa[];
}

export const ProgramaFormSelector = (props: IProps) => {
  const {
    planStudy: data,
    headquarters,
    programsTypes,
    knowledgeArea,
    modalities,
    convocatory,
    uuid,
  } = props;

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      promotion: "",
      programas: [],
    },
  });

  const programas = watch("programas");
  const [expandedProgram, setExpandedProgram] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (formData: FormValues) => {
    setLoading(true);

    if (formData.programas.length === 0) {
      toast.error(
        <ToastCustom
          title="Error"
          description="Debe seleccionar al menos un programa."
        />
      );
      return;
    }

    // Formatear los datos para la API bulk
    const payload: IConvocatoryBulkListCreate[] = formData.programas.map(
      (programa) => ({
        promotion: formData.promotion,
        study_plan_uuid: programa.planesEstudio.length
          ? programa.planesEstudio[0].uuid
          : "Este campo es requerido.",
        headquarter_uuid: programa.sede || "Este campo es requerido.",
        convocatory:
          convocatory?.[0].id.toString() || "Este campo es requerido.",
        modality:
          programa.modalidad?.id.toString() || "Este campo es requerido.",
      })
    );

    try {
      const response = await createConvocatoryBulk(payload);

      if (response?.status === 200 || response?.status === 201) {
        toast.success(
          <ToastCustom
            title="Éxito"
            description={`Se han registrado ${response?.data?.length} programas.`}
          />
        );
        router.push(`/admin/convocatorias/${uuid}?section=program`);	
      } else {
        toast.error(
          <ToastCustom title="Error" description={`${response?.errors}`} />
        );
      }
    } catch (error) {
      console.error("Error en la petición:", error);
      toast.error(
        <ToastCustom
          title="Error"
          description="No se pudo conectar con el servidor."
        />
      );
    } finally {
      setLoading(false);
    }
  };

  const handleAddPrograma = (
    programa: ProgramaBase,
    modalidad: IModality | undefined,
    sede: string,
    planes: IStudyPlan[]
  ) => {
    const newPrograma: Programa = {
      ...programa,
      modalidad,
      sede,
      planesEstudio: planes,
    };

    const exists = programas.some(
      (p) => p.id === newPrograma.id && p.sede === newPrograma.sede
    );

    if (!exists) {
      setValue("programas", [...programas, newPrograma]);
    } else {
      toast.error(
        <ToastCustom
          title="Programa ya seleccionado"
          description="Por favor, seleccione otro programa."
        />
      );
    }

    setExpandedProgram(null);
  };

  const handleRemovePrograma = (id: string, sede: string) => {
    setValue(
      "programas",
      programas.filter((p) => p.id !== Number(id) || p.sede !== sede)
    );
  };

  const mappedProgramas = (data ?? []).map((programa) => ({
    id: programa.id,
    tipo: programa.program_type,
    nombre: programa.name,
    area: programa.area.map((a) => a.name).join(", "),
    plans: programa.study_plan.map((plan) => ({
      id: plan.id,
      description: plan.description,
      academic_cycles: plan.academic_cycles,
      uuid: plan.uuid,
      is_active: plan.is_active,
      file: plan.file,
      program: plan.program,
    })),
  }));

  const getSedeName = (uuid: string) => headquarters?.find((sede) => sede.uuid === uuid)?.name || "Sede desconocida";


  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-h-screen bg-gray-50 space-y-4"
    >
      <section className="space-y-4 bg-white dark:bg-gray-800 p-4 rounded">
        <div className="w-full flex flex-col gap-2 justify-start items-start bg-white dark:bg-gray-800">
          <Label>Promoción:</Label>
          <Input
            {...register("promotion", {
              required: "La promoción es requerida",
            })}
            placeholder="Ejemplo: 2025"
            className="w-full h-9 rounded"
          />
          {errors.promotion && (
            <span className="text-red-500 text-sm">
              {errors.promotion.message}
            </span>
          )}
        </div>
        <FilterHeader
          programsTypes={programsTypes}
          knowledgeArea={knowledgeArea}
        />
      </section>

      <section className="flex flex-col md:flex-row items-start gap-4 pb-16">
        <div className="w-full md:w-2/3">
          <h2 className="font-bold mb-4">Programas disponibles</h2>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 h-[calc(100vh-15rem)] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100 max-w-md">
            <div className="space-y-4">
              {mappedProgramas.map((programa) => (
                <div
                  key={programa.id}
                  className="border rounded-lg overflow-hidden"
                >
                  <div
                    className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                      expandedProgram === programa.id.toString()
                        ? "bg-blue-50"
                        : ""
                    }`}
                    onClick={() =>
                      setExpandedProgram(
                        expandedProgram === programa.id.toString()
                          ? null
                          : programa.id.toString()
                      )
                    }
                  >
                    <h3 className="font-medium text-gray-900">
                      {programa.nombre}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {programa.tipo.name} - {programa.area}
                    </p>
                  </div>

                  {expandedProgram === programa.id.toString() && (
                    <ProgramaDetails
                      programa={programa}
                      onSubmit={handleAddPrograma}
                      headquarters={headquarters}
                      modalities={modalities ?? []}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {programas.length > 0 && (
          <div className="w-full">
            <h2 className="font-bold mb-4">Programas seleccionados</h2>
            <div className="bg-white shadow-lg rounded-lg p-6 space-y-4">
              {programas.map((programa) => (
                <div
                  key={`${programa.id}${programa.sede}`}
                  className="border rounded p-4 space-y-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium text-lg">{programa.nombre}</h3>
                    <Button
                      size={"sm"}
                      type="button"
                      variant="outline"
                      onClick={() =>
                        handleRemovePrograma(
                          programa.id.toString(),
                          programa.sede
                        )
                      }
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </Button>
                  </div>
                  <div className="text-gray-600 text-sm flex flex-col md:flex-row justify-between">
                    <span>⚙️Modalidad: {programa.modalidad?.name}</span>
                    <span>🌍Sede: {getSedeName(programa.sede)}</span>
                  </div>
                  {programa.planesEstudio.length > 0 && (
                    <div className="mt-2">
                      <p className="font-medium">Planes de Estudio:</p>
                      <ul className="list-disc list-inside">
                        {programa.planesEstudio.map((plan) => (
                          <li key={plan.id} className="text-gray-600 text-sm">
                            {plan.description} - {plan.academic_cycles} ciclos
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </section>

      <BottomActions
        content={
          <>
            <Button variant="outline" type="button">
              Cancelar
            </Button>
            <Button type="submit" disabled={loading || programas.length === 0}>
              Guardar
            </Button>
          </>
        }
      />
    {loading && <SpinnerLoadingScreen />}
    </form>
  );
};
