export interface IRequirement {
  id: number
  name: string
  description: string
  is_active: boolean
  dimension_requirement: number
}

export interface IRequirementCreate {
    name: string;
    description: string;
    is_active: boolean;
    dimension_requirement: number;
}

export interface IDimensionRequirement {
    id: number;
    name: string;
    is_active: boolean;
}