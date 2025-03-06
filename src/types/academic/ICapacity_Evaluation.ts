import { IPostponed } from './IPostponed'
import { ICourseGroup } from './ICourse_Group'

export interface ICapacity_Evaluation {
    id: number
    id_course_group: ICourseGroup
    id_postponed: IPostponed
    name: string
    percentage_value: number
}