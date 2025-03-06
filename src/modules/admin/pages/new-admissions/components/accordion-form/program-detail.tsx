"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import type { ProgramaBase } from "./types";
import { Button } from "@/components/ui/button";
import { IHeadquarter, IStudyPlan } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IModality } from "@/types/admission/IModality";

interface ProgramaDetailsProps {
    programa: ProgramaBase;
    headquarters?: IHeadquarter[] | null;
    modalities: IModality[] | null;
    onSubmit: (
      programa: ProgramaBase,
      modalidad: IModality | undefined,
      sede: string,
      planes: IStudyPlan[]
    ) => void;
  }
  
export const ProgramaDetails = (props: ProgramaDetailsProps) => {
    const { programa, onSubmit, headquarters, modalities } = props;
  
    const [modalidad, setModalidad] = useState<IModality>();
    const [sede, setSede] = useState("");
    const [selectedPlanes, setSelectedPlanes] = useState<IStudyPlan[]>([]);
  
    const handlePlanToggle = (plan: IStudyPlan) => {
      setSelectedPlanes((prev) =>
        prev.some((p) => p.id === plan.id)
          ? prev.filter((p) => p.id !== plan.id)
          : [...prev, plan]
      );
    };
  
    return (
      <div className="p-4 bg-gray-50 border-t">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Modalidad
            </label>
            <div className="space-y-2">
              {modalities?.map((mod) => (
                <label key={mod.id} className="flex items-center space-x-2">
                  <input
                    type="radio"
                    checked={modalidad === mod}
                    onChange={() => setModalidad(mod)}
                    className="text-blue-600"
                  />
                  <span className="text-sm text-gray-700">{mod.name}</span>
                </label>
              ))}
            </div>
          </div>
  
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sede
            </label>
            <Select onValueChange={(value) => setSede(value)} value={sede}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una sede">
                  {headquarters?.find((item) => item.uuid === sede)?.name}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {headquarters?.map((item) => (
                  <SelectItem key={item.id} value={item.uuid}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
  
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Planes de Estudio
          </label>
          <div className="grid grid-cols-1 gap-2">
            {programa.plans.map((plan) => (
              <label
                key={plan.id}
                className={`flex items-center p-2 rounded border ${
                  selectedPlanes.some((p) => p.id === plan.id)
                    ? "bg-blue-50 border-blue-200"
                    : "bg-white border-gray-200"
                } cursor-pointer hover:bg-gray-50`}
              >
                <input
                  type="checkbox"
                  checked={selectedPlanes.some((p) => p.id === plan.id)}
                  onChange={() => handlePlanToggle(plan)}
                  className="text-blue-600 mr-2"
                />
                <div className="flex-1">
                  <p className="font-medium text-sm">{plan.description}</p>
                  <p className="text-xs text-gray-500">
                    ciclos - {plan.academic_cycles}
                  </p>
                </div>
              </label>
            ))}
          </div>
        </div>
  
        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={() => onSubmit(programa, modalidad, sede, selectedPlanes)}
            disabled={!sede || selectedPlanes.length === 0 || !modalidad}
            size={"sm"}
          >
            <Check className="w-4 h-4 mr-2" />
            Seleccionar
          </Button>
        </div>
      </div>
    );
  };
  