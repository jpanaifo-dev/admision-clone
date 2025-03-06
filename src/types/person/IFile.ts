export interface IPersonFile {
  id: number
  person: number
  file: string
  file_Type: number
  is_active: boolean
  is_valid: boolean
  created_at: string
  updated_at: string
}

export interface IPersonFileRequirements {
  requirement: IPersonFileRequirement
  file: IPersonFile | null
}

export interface IPersonFileRequirement {
  id: number
  name: string
  description: string
  is_active: boolean
  requirement_type: number
}
