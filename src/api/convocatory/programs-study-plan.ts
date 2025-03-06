"use server";

import { IProgramPlanStudy, IProgramPlanStudyFilter } from "@/types";
import { fetchProgramService } from "@/api/core";
import { ENDPOINTS_CONFIG } from "@/config/endpoints.config";

const API_BASE = ENDPOINTS_CONFIG.PROGRAM;

export const fetchProgramStudyPlan = async (
  filters?: IProgramPlanStudyFilter
): Promise<{
  status: number;
  data?: IProgramPlanStudy[] | null;
  errors?: string[];
}> => {
  const queryParams = new URLSearchParams();
  if (filters) {
    for (const key in filters) {
      queryParams.append(
        key,
        filters[key as keyof IProgramPlanStudyFilter] as string
      );
    }
  }

  const url = `${API_BASE.PROGRAM_STUDY_PLAN}?${queryParams.toString()}`;

  try {
    const response = await fetchProgramService.get(`${url}`);

    if (!response.ok) {
      const errorResponse: {
        [key: string]: string[];
      } = await response.json();
      const errorMessages = Object.values(errorResponse).flat();
      return {
        status: response.status,
        errors: errorMessages,
        data: null,
      };
    }

    // Si el estado es exitoso, parseamos los datos
    const responseData: IProgramPlanStudy[] = await response.json();

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error("Error al realizar la petición:", error);
    return {
      status: 500,
      errors: ["Error al conectar con el servidor."],
      data: null,
    };
  }
};
