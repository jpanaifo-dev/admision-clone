import { IPerson } from "../person";

export interface IFileUser {
    id: number;
    id_person: IPerson;
    id_promo_convocatory: number;
    university_code: string;
    state_expedient: string;
}