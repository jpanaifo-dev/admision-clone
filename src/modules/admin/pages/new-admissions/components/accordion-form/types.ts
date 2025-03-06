import { IProgramPlanStudyType, IStudyPlan } from "@/types";
import { IModality } from "@/types/admission/IModality";


export interface ProgramaBase {
  id: number;
  tipo: IProgramPlanStudyType;
  nombre: string;
  area: string;
  plans: IStudyPlan[];
}

export interface Programa extends ProgramaBase {
  modalidad?: IModality;
  sede: string;
  planesEstudio: IStudyPlan[];
}