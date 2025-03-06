import { IAdmin_Unity } from './IAdmin_Unity'

export interface IArea {
  id: number
  id_admin_unity: IAdmin_Unity
  name: string
  key_name: string
  email: string
  is_active: boolean
  can_recieve_external_procedure: boolean
}