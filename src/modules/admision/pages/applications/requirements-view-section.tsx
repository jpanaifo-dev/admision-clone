'use client'
import { useState } from 'react'
import { type IRequirementProgram, type IUserAuth } from '@/types'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { FileSelectionModal, UploadDocumentsModal } from '../apply-to'
import { toast } from 'react-toastify'
import { AlertCustom, ToastCustom } from '@/components/app'
import { useRouter } from 'next/navigation'
import { confirmPostulation } from '@/api/auth'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'

interface RequirementsViewSectionProps {
  programRequirement: IRequirementProgram[]
  userAuth: IUserAuth
  application_id: string
  url_redirect: string
  convocatory_token: string
  inCall?: boolean
}

export const RequirementsViewSection = ({
  programRequirement,
  application_id,
  url_redirect,
  convocatory_token,
  userAuth,
  inCall = true,
}: RequirementsViewSectionProps) => {
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()

  const handleSaveApplication = async () => {
    setIsLoading(true)
    toast.success(
      <ToastCustom
        title="Postulación guardada"
        description="Tu postulación ha sido guardada correctamente"
      />
    )

    if (url_redirect !== ADMISSION_URLS_APP.CONVOCATION.URL_BASE) {
      await confirmPostulation({
        convocatory_token: convocatory_token,
        email: userAuth.email,
        person_token: userAuth.person_token,
      })
    }
    router.push(`${url_redirect}`)
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsLoading(false)
  }

  return (
    <div className="space-y-8 bg-white rounded-md p-4 sm:p-6">
      <h1 className="text-xl font-extrabold mb-6">Requisitos del Programa</h1>
      {programRequirement.map((requirement) => (
        <div
          key={requirement.id}
          className="space-y-4 pb-6 border-b last:border-b-0"
        >
          <h2 className="font-bold md:text-lg">{requirement.name}</h2>
          <div
            dangerouslySetInnerHTML={{ __html: requirement.description }}
            className="text-sm md:text-[15px] text-foreground-800 space-y-1 text-justify"
          />
          {requirement?.is_permit_file && (
            <div className="flex items-center justify-between">
              <Link
                href={
                  `${
                    requirement?.is_attach
                      ? requirement?.attachment_file
                      : requirement?.requeriment_file
                  }` || '#'
                }
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                target="_blank"
              >
                <FileText className="h-4 w-4" />
                <span>
                  {requirement.requeriment_file || requirement.attachment_file
                    ? 'Ver archivo actual'
                    : 'No hay archivo'}
                </span>
              </Link>
              {inCall && (
                <div className="mt-4 flex justify-end gap-4">
                  <FileSelectionModal
                    requirementId={Number(requirement.id)}
                    promotionConvocatoryId={Number(
                      requirement?.promotion_convocatory_requirement_id
                    )}
                    userAuth={userAuth}
                  />
                  <UploadDocumentsModal
                    applicationId={Number(application_id)}
                    requirementId={Number(requirement.id)}
                    promotionConvocatoryId={Number(
                      requirement?.promotion_convocatory_requirement_id
                    )}
                  />
                </div>
              )}
            </div>
          )}
          {!requirement?.observation ||
            (requirement?.observation !== '' && (
              <div className="mt-4">
                <AlertCustom
                  title="Observación"
                  type="warning"
                  showIcon
                >
                  {requirement.observation}
                </AlertCustom>
              </div>
            ))}
        </div>
      ))}
      {inCall && (
        <footer className="flex justify-end">
          {/* <Button
            className=""
            variant="secondary"
            type='button'
            onClick={handleSaveApplication}
          >
            Subir archivos en otro momento
          </Button> */}
          <Button
            className=""
            disabled={isLoading}
            onClick={handleSaveApplication}
          >
            Guardar postulación
          </Button>
        </footer>
      )}
    </div>
  )
}
