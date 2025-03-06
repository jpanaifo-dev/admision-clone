export interface IPeriod {
  id: number
  uuid: string
  name: string
  is_active: boolean
}

export interface IPeriodFilter {
  id?: number
  uuid?: string
  name?: string
  name__icontains?: string
  is_active?: boolean
}
