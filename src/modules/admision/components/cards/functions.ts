import { format, isValid, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export function getDaysLeft(
  start: string | number | Date,
  end: string | number | Date
) {
  const startDate = new Date(start)
  const endDate = new Date(end)
  const diffTime = Math.abs(endDate.getTime() - startDate.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  return diffDays
}

export const formatDateRange = (
  start: string | null | undefined,
  end: string | null | undefined
) => {
  if (!start) return 'Fecha de inicio inválida' // Validar si start es null/undefined
  const startDate = parseISO(start)
  const endDate = end ? parseISO(end) : new Date()

  if (!isValid(startDate)) return 'Fecha de inicio inválida'
  if (end && !isValid(endDate)) return 'Fecha de fin inválida'

  return `${format(startDate, 'MMMM yyyy', {
    locale: es,
  })} - ${
    end
      ? format(endDate, 'MMMM yyyy', {
          locale: es,
        })
      : 'Actualidad'
  }`
}

export const getLastYearsJobs = (
  start: string | null | undefined,
  end: string | null | undefined,
  labelMonth: string
) => {
  if (!start) return 'Fecha de inicio inválida' // Validar si start es null/undefined
  const startDate = parseISO(start)
  const endDate = end ? parseISO(end) : new Date()

  if (!isValid(startDate)) return 'Fecha de inicio inválida'
  if (end && !isValid(endDate)) return 'Fecha de fin inválida'

  const years = endDate.getFullYear() - startDate.getFullYear()
  const months = endDate.getMonth() - startDate.getMonth()

  if (years > 0) {
    return `${years} ${years === 1 ? 'año' : 'años'} y 
        ${
          months > 0
            ? `${months === 1 ? '1 mes' : `${months} meses`}`
            : 'menos de un mes'
        }
        de ${labelMonth}`
  } else if (months > 0) {
    return `${months === 1 ? '1 mes' : `${months} meses`} de ${labelMonth}`
  } else {
    return `Menos de un mes de ${labelMonth}`
  }
}
