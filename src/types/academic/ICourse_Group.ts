import { IPeriod } from '../core/IPeriod'
import {IResolution_Directoral} from '../core/IResolution_Directoral'
import { ITeacher } from './ITeacher'
import { ICourse } from './ICourse';

export interface ICourseGroup {
    id: number;
    id_course: ICourse;
    id_teacher: ITeacher;
    id_period: IPeriod;
    id_directoral_resolution: IResolution_Directoral;
    group: string;
    max_students: number;
    start_date: Date;
    end_date: Date;
    is_published: boolean;
    is_closed_acta: boolean;
}