import { normalizeDate } from "@/utils/normalize-date";
import * as z from "zod";

export const ConvocatoryCreateSchema = (isEditMode: boolean) => z
  .object({
    description: z.string().min(1, { message: "Este campo es requerido" }),
    start_date: z
      .date()
      .default(new Date())
      .refine((date) => isEditMode || normalizeDate(date) >= normalizeDate(new Date()), {
        message: "La fecha no puede ser menor a la fecha actual.",
      }),
    end_date: z.date(),
    is_active: z.boolean().default(true),
    regulation: z.any().nullable(),
  })
  .superRefine((data, ctx) => {
    if (normalizeDate(data.end_date) <= normalizeDate(data.start_date)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "La fecha de fin debe ser mayor a la fecha de inicio.",
        path: ["end_date"],
      });
    }
  });


  export type ConvocatoryCreateType = z.infer<ReturnType<typeof ConvocatoryCreateSchema>>;