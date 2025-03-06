import { format } from 'date-fns'
import { es } from 'date-fns/locale'

export function formatDate(date: string) {
  return format(new Date(date), 'd MMMM, yyyy', { locale: es })
}
