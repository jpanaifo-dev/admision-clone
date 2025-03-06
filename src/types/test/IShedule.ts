export interface ICronograma {
  schedules: Schedule[]
}

export interface Schedule {
  call_stage_id: number
  events: Event[]
}

export interface Event {
  id: number
  name: string
  description: string
  date: string
}
