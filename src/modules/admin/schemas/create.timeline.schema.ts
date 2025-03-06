import { normalizeDate } from '@/utils/normalize-date'
import * as z from 'zod'

export const CreateTimelineSchema = z.object({
  rows: z.array(
    z
      .object({
        id: z.number().optional(),
        name: z.string().min(1),
        start_date: z.date().default(new Date()),
        end_date: z.date(),
        is_active: z.boolean().default(true),
        is_inscription: z.boolean().default(false),
        convocatory: z.string(),
      })
      .superRefine((data, ctx) => {
        if (normalizeDate(data.end_date) <= normalizeDate(data.start_date)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'La fecha de fin debe ser mayor a la fecha de inicio.',
            path: ['end_date'],
          })
        }
      })
  ),
})

export type CreateTimelineType = z.infer<typeof CreateTimelineSchema>
