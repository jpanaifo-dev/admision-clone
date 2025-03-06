// import { IHeadquarter } from '../core'
// import { IProgram } from './IProgram'

export interface IProm_Convocatory {
  id: number
  id_convocatory: number
  id_study_plan: number
  id_headquarter: number
  promo_class: string
  cost_quota: number
  quotas: number
}

export interface IProgramCallFilter {
  convocatory_token?: string
  query?: string
  program_type_name?: string
}

export interface IProgramBannerFilter {
  convocatory_token?: string
  study_plan_token?: string
  headquarter_token?: string
}
