import { IFileUser } from "../academic/IFile_User";
import { IConcept } from "./IConcept";

export interface IPayment {
    id: number;
    client_name: string;
    document_number: string;
    operation_number: string;
    date: Date;
    amount: number;
    is_active: boolean;
    is_conciliate: boolean;
    conciliate_number: string;
    paid_file: string;
    id_concept: IConcept;
    id_file_user: IFileUser;
}