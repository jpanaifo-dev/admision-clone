import { IPersonType } from '@/types/person'
import { IDocumentType } from '@/types/person'
import { IPersonContact } from '@/types/person'

export interface IExternal_person {
  id: number
  id_document_type: IDocumentType
  id_person_type: IPersonType
  document_number: string
  name: string
  last_name_1: string
  last_name_2: string
  phone: string
  email: string
  id_contact_person: IPersonContact
}