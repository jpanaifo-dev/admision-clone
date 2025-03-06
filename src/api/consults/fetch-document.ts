const API_KEY_RENIEC = process.env.API_KEY_RENIEC
const URL_API = process.env.API_RENIEC
import { IDocumentSimpleRes } from '@/types/services'

export const fetchDocument = async (
  document: string,
  type: 'simple' | 'complete' = 'simple'
): Promise<IDocumentSimpleRes | null> => {
  try {
    const response = await fetch(
      `${URL_API}${type}?key=${API_KEY_RENIEC}&document=${document}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
    )

    if (response.status !== 200) {
      return null
    }
    const data = await response.json()
    return data as IDocumentSimpleRes
  } catch (error) {
    console.error('Error fetching document:', error)
    return null
  }
}
