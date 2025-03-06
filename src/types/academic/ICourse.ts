export interface ICourse {
  id: number
  name: string
  code: string
  academic_cycle: string
  credits: number
  theorist_hours: number
  practice_hours: number
  study_type: string
  course_type: string
  description: string
  requirements: IRequerimentPlan[]
}

export interface IRequerimentPlan {
  requirement: string
}
