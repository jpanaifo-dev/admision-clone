export interface ITimeline {
  timeline?: IEventCall[]
  programs?: IProgramTypeCall[]
}

export interface IProgramTypeCall {
  program_type: string
  abbreviation: string
  count: number
}

export interface IEventCall {
  id: number
  name: string
  start_date: Date
  end_date: Date
  is_active: boolean
  is_inscription: boolean
  convocatory: number
}

export interface IEventCallFilter {
  id?: number
  convocatory_id?: number
  convocatory__uuid?: string
  name__icontains?: string
}

export interface IEventCallCreate {
  id?: number
  name: string
  start_date: string
  end_date: string
  is_active: boolean
  is_inscription: boolean
  convocatory: number
}

export interface IEventCallUpdate {
  id: number
  name?: string
  start_date?: string
  end_date?: string
  is_active?: boolean
  is_inscription?: boolean
  convocatory?: number
}
