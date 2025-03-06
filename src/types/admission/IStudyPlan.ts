import { ICourse } from '../academic'

export interface IStudyPlanDetails {
  id: number
  uuid: string
  description: string
  file: string
  course: ICourse[]
}
