import { z } from 'zod'

export const filePersonSchema = z.object({
  file: z.instanceof(File).refine((file) => file.type === 'application/pdf', {
    message: 'Only PDF files are allowed.',
  }),
  file_Type: z.number().nullable(),
  is_active: z.boolean(),
  requirement: z.number().nullable(),
  person_token: z.string().nullable(),
})

export type FilePesonSchemaType = z.infer<typeof filePersonSchema>
