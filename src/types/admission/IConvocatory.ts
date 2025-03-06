import { ICourse } from '../academic'

export interface IConvocatory {
  id: number
  uuid: string
  period_uuid: string
  description: string
  start_date: Date
  end_date: Date
  is_active: boolean
  is_public: boolean
  regulations: string | null
}

export interface IConvocatoryFilter {
  is_active?: boolean
  is_public?: boolean
  uuid?: string
  description__icontains?: string
  start_date__gte?: string
  start_date__lte?: string
  end_date__gte?: string
  end_date__lte?: string
}

export interface IStudyPlanDetails {
  id: number
  uuid: string
  description: string
  file: string
  course: ICourse[]
}
