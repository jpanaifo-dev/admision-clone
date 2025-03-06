export interface IProgram {
  id: number
  titulo: string
  planEstudios: string
  facultad: string
  creditos: number
  duracion: string
  estado: string
  botones: IButton[]
  etiqueta: string
}

export interface IButton {
  texto: string
  tipo: 'outline' | 'primary'
}
