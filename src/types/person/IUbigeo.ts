export interface IUbigeo {
  id: number
  uuid: string
  code: number
  region: string
  province: string
  district: string
}

export interface IUbigeoFilterDataQuery {
  query: string
}

export interface IUniversity {
  id: number
  uuid: string
  name: string
  country: null
  website: string
}

export interface IUniversityQuery {
  search?: string
}
