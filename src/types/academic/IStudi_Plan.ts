import { IConcept } from '../economic/IConcept'
import { IPrograms } from './IPrograms'

export interface IStudi_Plan {
    id: number
    description: string
    is_active: boolean
    id_programs: IPrograms
    id_concept: IConcept
    enrllment_quantity: number
}