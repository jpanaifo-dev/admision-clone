import { IAdmin_Unity } from './../core/IAdmin_Unity';
import {IPrograms_Types} from "./IPrograms_Types"

export interface IPrograms {
    id: number
    code: string
    name: string
    is_active: boolean
    id_programs_types: IPrograms_Types
    IAdmin_Unity: IAdmin_Unity
}