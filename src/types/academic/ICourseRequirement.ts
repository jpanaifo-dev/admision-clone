import { ICourse } from "./ICourse";

export interface ICourseRequirement {
    id: number;
    id_course: ICourse;
    id_requirement: ICourse;
    requirement_credits: number;
    is_active: boolean;
}