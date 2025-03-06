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
  convocatory: number
}
