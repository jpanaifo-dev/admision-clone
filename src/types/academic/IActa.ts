import { ICourseGroup } from './ICourse_Group'

export interface IActa {
    id: number;
    date: Date;
    code: string;
    acta_file: string;
    id_course_group: ICourseGroup;
}