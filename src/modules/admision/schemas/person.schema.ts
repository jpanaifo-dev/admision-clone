import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = [
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
]

const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB

export const PersonSchema = z.object({
  document_type: z.number(),
  last_name1: z.string(),
  last_name2: z.string(),
  photo: z
    .any()
    .refine(
      (value) => {
        if (Array.isArray(value)) {
          return value.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type))
        }
        return false
      },
      { message: 'El archivo debe ser una imagen' }
    )
    .refine(
      (value) => {
        if (Array.isArray(value)) {
          return value.every((file) => file.size <= MAX_FILE_SIZE)
        }
        return false
      },
      { message: 'El archivo debe ser menor a 5MB' }
    ),
  document_number: z.string(),
  names: z.string(),
  person_type: z.number(),
  comunity_indigenous: z.string().optional(),
  ubigeo_birth_uuid: z.string().uuid(),
  gender: z.string().min(1, 'El género es requerido'),
  marital_status: z.number().int().min(1, 'Estado civil es requerido'),
  birthdate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Fecha de nacimiento inválida',
  }),
  country_uuid: z.string().uuid(),
  disability: z.string(),
  native_language: z.string().optional(),
})

export const PersonContactSchema = z.object({
  ubigeo_address_uuid: z.string(),
  address: z.string().min(1, 'La dirección es requerida'),
  email: z.string().email('Correo electrónico inválido').nullable(),
  phone: z
    .string()
    .regex(/^\+?\d{7,15}$/, 'Número de teléfono inválido')
    .nullable(),
  whatsapp_phone: z
    .string()
    .regex(/^\+?\d{7,15}$/, 'Número de WhatsApp inválido')
    .nullable(),
  linkedin: z.string().optional(),
})

export type PersonInfoSchemaType = z.infer<typeof PersonSchema>
export type PersonContactSchemaType = z.infer<typeof PersonContactSchema>
