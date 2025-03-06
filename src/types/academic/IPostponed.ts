import {IResolution_Directoral} from '../core/index'
import { ITeacher } from './ITeacher'

export interface IPostponed {
    id: number
    id_resolition_directoral: IResolution_Directoral
    id_teacher: ITeacher
    is_presencia: boolean
    data_document: Date
}