import { IPerson } from "../person";
import { IEnrollmentType } from "./IEnrollmentType";
import { IPeriod } from "../core/IPeriod";
import { IFileUser } from "./IFile_User";

export interface IEnrollment {
    id: number;
    id_file_user: IFileUser;
    id_person: IPerson;
    id_period: IPeriod;
    id_enrollment_type: IEnrollmentType;
    date: Date;
}