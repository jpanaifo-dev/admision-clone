import { IHeadquarter } from '../core/IHeadquarter'

export interface IRoom {
    id: number;
    id_headquarter: IHeadquarter;
    name: string;
    capacity: number;
    is_active: boolean;
}