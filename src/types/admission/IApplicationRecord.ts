import { ApplicantFileList } from '@/modules/admision'

export interface IApplicationRecord {
  id: number
  program_name: string
  created_at: string
  convocatory_name: string
  requirements: Requirements
  convocatory_status: string
  convocatory_is_active: boolean
  program_study_plan_description: string
  program_study_plan_uuid: string
  convocatory_uuid: string
  headquarter_uuid: string
  payment_uuid: string
}

export interface Requirements {
  documents_presented: string[]
  observations: Observation[]
}

export interface Observation {
  requirement_name: string
  observation: string
}

export interface IApplicationFileList extends ApplicantFileList {
  id: number
  created_at: string
  updated_at: string
}

export interface IConvocatoryValidation {
  is_registered: boolean
}
