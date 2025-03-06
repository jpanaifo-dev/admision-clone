import { IPersonFile } from '@/types'

export function removeAccents(str: string) {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

export function getThumbnail(file: IPersonFile) {
  const { file: filePath } = file
  const fileExtension = filePath.split('.').pop()?.toLowerCase()

  if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(fileExtension || '')) {
    return filePath // Imagen: usar la URL directamente
  } else if (fileExtension === 'pdf') {
    return 'https://blog.quizpm.com/wp-content/uploads/2018/12/Certificado.jpg' // PDF: miniatura para PDFs
  } else {
    return 'https://blog.quizpm.com/wp-content/uploads/2018/12/Certificado.jpg' // Otros: ícono genérico
  }
}

export function getLastUrlSegment(path: string): string {
  const segments = path?.split('/')
  return segments && segments.length > 0 ? segments[segments.length - 1] : ''
}
