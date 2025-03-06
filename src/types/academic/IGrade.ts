import { ICapacity_Evaluation } from './ICapacity_Evaluation'
import {IEnrollmentCourse} from './IEnrollment_course'

export interface IGrade {
    id: number;
    id_enrollment_course: IEnrollmentCourse;
    id_capacity_evaluation: ICapacity_Evaluation;
    grade: number;
    date: Date;
}