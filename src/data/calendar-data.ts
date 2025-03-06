import { Schedule } from "@/modules/admin/pages/admission-details/schedule-list";

export const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];
export const events = [
  {
    title: "Curso Matemáticas",
    start: "2025-01-06T18:00:00",
    end: "2025-01-06T20:00:00",
    allDay: false,
    rrule: {
      freq: "weekly",
      byweekday: ["mo", "we", "fr"],
      dtstart: "2025-01-06T18:00:00",
      until: "2025-04-30T20:00:00",
    },
  },
  {
    title: "Curso Ciencias",
    start: "2025-01-22T10:00:00",
    end: "2025-01-22T12:00:00",
    allDay: false,
  },
  {
    title: "Curso Historia",
    start: "2025-01-24T13:00:00",
    end: "2025-01-24T15:00:00",
    allDay: false,
  },
];

export const schedules: Schedule[] = [
  {
    id: 1,
      description: "Lunes, Miercoles Y Viernes de 7:00 pm a 11:00 pm",
      is_active: true,
      promotion_convocatory: 2025,
  },
  {
    id: 2,
      description: "Martes y Jueves de 7:00 pm a 11:00 pm",
      is_active: true,
      promotion_convocatory: 2025,
  },
];

