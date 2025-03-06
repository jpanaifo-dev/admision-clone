import { IArea } from './IArea'
import { IHeadquarter } from './IHeadquarter'
import { IOcupation } from './IOcupation'
import { IPerson } from '@/types/person'

export interface IAdmin_Job_Ocupation {
  id: number
  id_occupation: IOcupation
  id_person: IPerson
  id_headerquarter: IHeadquarter
  id_area: IArea
  is_active: boolean
}