"use server";

import { IProgramType } from "@/types/program/IProgramType";
import { fetchProgramService } from "@/api/core";
import { ENDPOINTS_CONFIG } from "@/config/endpoints.config";

const API_BASE = ENDPOINTS_CONFIG.PROGRAM;

export const fecthProgramType = async (): Promise<{
  status: number;
  data?: IProgramType[] | null;
  errors?: string[];
}> => {
  try {
    const response = await fetchProgramService.get(`${API_BASE.PROGRAM_TYPE}`);

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
    const responseData: IProgramType[] = await response.json();

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
