import { IFileUser } from "./IFile_User";
import { ICourse } from "./ICourse";

export interface IConvalidationCourse {
    id: number;
    id_course: ICourse;
    id_expedient: IFileUser;
    grade: number;
    date: Date;
    observation: string;
}