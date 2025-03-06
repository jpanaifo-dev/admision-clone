import { normalizeDate } from '@/utils/normalize-date'
import * as z from 'zod'

export const ConvocatoryCreateSchema = (isEditMode: boolean) =>
  z
    .object({
      description: z.string().min(1, { message: 'Este campo es requerido' }),
      start_date: z
        .string()
        .refine(
          (date) =>
            isEditMode ||
            normalizeDate(new Date(date)) >= normalizeDate(new Date()),
          {
            message: 'La fecha no puede ser menor a la fecha actual.',
          }
        )
        .transform(
          (date) => normalizeDate(new Date(date)).toISOString().split('T')[0]
        ),
      end_date: z
        .string()
        .transform(
          (date) => normalizeDate(new Date(date)).toISOString().split('T')[0]
        ),
      is_active: z.boolean().default(true),
      regulation: z.any().nullable(),
      is_public: z.boolean().default(false),
      period_uuid: z.string().optional(),
    })
    .superRefine((data, ctx) => {
      if (
        normalizeDate(new Date(data.end_date)) <=
        normalizeDate(new Date(data.start_date))
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'La fecha de fin debe ser mayor a la fecha de inicio.',
          path: ['end_date'],
        })
      }
    })

export type ConvocatoryCreateType = z.infer<
  ReturnType<typeof ConvocatoryCreateSchema>
>
