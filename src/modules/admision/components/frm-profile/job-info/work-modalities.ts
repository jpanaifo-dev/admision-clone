export const WORK_MODALITIES = [
  { id: 1, name: 'Presencial' },
  { id: 2, name: 'Remoto' },
  { id: 3, name: 'Híbrido' },
  { id: 4, name: 'Freelance' },
  { id: 5, name: 'Por proyecto' },
  { id: 6, name: 'Tiempo parcial' },
  { id: 7, name: 'Tiempo completo' },
  { id: 8, name: 'Contratación temporal' },
  { id: 9, name: 'Contratación indefinida' },
  { id: 10, name: 'Trabajo por horas' },
  { id: 11, name: 'Trabajo por turnos' },
] as const

export type ModalidadTrabajo = (typeof WORK_MODALITIES)[number]
