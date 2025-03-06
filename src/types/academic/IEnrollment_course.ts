import {ICourseGroup} from './ICourse_Group'
import { IEnrollment } from './IEnrollment';

export interface IEnrollmentCourse {
    id: number;
    id_course_group: ICourseGroup;
    id_enrollment: IEnrollment;
    is_retired: boolean;
    is_old: boolean;
    num_acta_old: string;
    is_closed_acta: boolean;
    is_postponed: boolean;
}
