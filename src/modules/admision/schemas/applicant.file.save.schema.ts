import { z } from 'zod'

export const ApplicantFormSchema = z.object({
  person_token: z.string().uuid(),
  promotion_convocatory_id: z.number(),
  admission_modality_id: z.number(),
  payment_token: z.string().uuid(),
  requirements: z.array(
    z.object({
      id: z.number(),
      requirement_file: z.any().refine((file) => {
        return file !== undefined
      }),
    })
  ),
})

export const ApplicantListFormSchema = z.object({
  person_uuid: z.string(),
  payment_uuid: z.string(),
  promotion_convocatory: z.number(),
  admission_modality: z.number(),
})

export const EvaluationFormSchema = z.object({
  score: z.number().optional(),
  requeriment_file: z.any().optional(),
  observation: z.string().optional(),
  applicant_file: z.number().optional(),
  promotion_convocatory_requirement: z.number().optional(),
})

export const ValidatePersonConvocatorySchema = z.object({
  person_token: z.string().uuid(),
  convocatory_token: z.string().uuid(),
})

export const AtthachmentToRequirementSchema = z.object({
  evaluation_id: z.number(),
  url_file: z.string(),
})

export type ApplicantType = z.infer<typeof ApplicantFormSchema>
export type ApplicantFileList = z.infer<typeof ApplicantListFormSchema>
export type EvaluationType = z.infer<typeof EvaluationFormSchema>
export type ValidatePersonConvocatoryType = z.infer<
  typeof ValidatePersonConvocatorySchema
>
export type AtthachmentToRequirementType = z.infer<
  typeof AtthachmentToRequirementSchema
>
