import { ICategory_Teacher } from './ICategory_Teacher'
import { IPerson } from '../person/IPerson'
import { ITime_Teacher } from './ITime_Teacher'

export interface ITeacher {
    id: number
    id_person: IPerson
    id_time_teacher: ITime_Teacher
    id_category_teacher: ICategory_Teacher
    is_active: boolean
}