import { IHeadquarter } from '../core'
import { IConvocatory } from './IConvocatory'

export interface IStudy_Plan {
  id: number
  uuid: string
  description: string
  total_credits: number
}

export interface IProgram {
  id: number
  type: string
  name: string
  description: string
  duration: string
  slots: number
  modality: string
  credits: number
  degree: string
  image: string
  associated_calls: number[]
  //news attributes
  study_plan: IStudy_Plan
  background: string
}

export interface IProgramCall {
  id: number
  uuid: string
  name: string
  code: string
  background?: string
  area: AreaTag[]
  study_plan: IStudy_Plan
}

export interface IProgramCallList {
  id: number
  promotion: string
  cost_quota: number
  quotas: number
  months_duration: number
  vacancies: number
  modality: string
  program: IProgram
  headquarter: IHeadquarter
}

export interface AreaTag {
  id: number
  name: string
  is_active: boolean
}

export interface IProgramBanner {
  id: number
  promotion: string
  cost_quota: number
  cost_total: number
  quotas: number
  months_duration: number
  vacancies: number
  modality: string
  program: IProgramCall
  inscription_end_date: string
  class_start_date: string
  headquarter: IHeadquarter
  is_active: boolean // with promotion expired date
  convocatory: IConvocatory
}

export interface IProgramDetails {
  program: IProgramInfo
  requirements: IRequirementProgram[]
}

export interface IProgramInfo {
  id: number
  uuid: string
  objective: string
  aplicant_profile: string
  graduate_profile: string
  study_plan: IStudy_Plan
}

export interface IRequirementProgram {
  id: number
  name: string
  description: string
  requeriment_file: string
  promotion_convocatory_requirement_id: number
  is_attach: boolean
  attachment_file: string
  is_permit_file: boolean
  observation: string
}

export interface IConvocatoryProgram {
  program_type: string;
  abbreviation: string;
  count:        number;
}
