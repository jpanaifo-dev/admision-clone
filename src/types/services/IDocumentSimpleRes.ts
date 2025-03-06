export interface IDocumentSimpleRes {
  estado: boolean
  mensaje: string
  resultado: ISimpleInformation
}

export interface ISimpleInformation {
  id: number
  apellido_materno: string
  apellido_paterno: string
  codigo_verificacion: string
  nombre_completo: string
  nombres: string
}
