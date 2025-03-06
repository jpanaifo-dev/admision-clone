"use server";
import { ENDPOINTS_CONFIG } from "@/config/endpoints.config";
import {
  IConvocatoryBulkList,
  IConvocatoryBulkListCreate,
} from "@/types/admission/IConvocatoryBulkList";
import { fetchAdmissionService } from "../core";

const API_BASE = ENDPOINTS_CONFIG.ADMISSION;

export const createConvocatoryBulk = async (
  convocatory: IConvocatoryBulkListCreate[]
): Promise<{
  status: number;
  data?: IConvocatoryBulkList[];
  errors?: string[];
}> => {
  const url = API_BASE.PROMOTION_CONVOCATORY_BULK;

  try {
    const response = await fetchAdmissionService.post(url, convocatory);
    if (!response.ok) {
      const errorResponse: Record<string, string[]> = await response.json();
      return {
        status: response.status,
        errors: Object.values(errorResponse).flat(),
      };
    }

    const responseData: IConvocatoryBulkList[] = await response.json();
    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    console.error("Error al realizar la petición:", error);
    return {
      status: 500,
      errors: ["Error al conectar con el servidor."],
    };
  }
};
