'use client'
import React, { useState } from 'react'
import { IProgramBanner, IRequirementProgram, IUserAuth } from '@/types'
import { Button } from '@/components/ui/button'
import { FileText } from 'lucide-react'
import Link from 'next/link'
import { UploadDocumentsModal } from '../components'
import { toast } from 'react-toastify'
import { ToastCustom } from '@/components/app'
import { useRouter, usePathname } from 'next/navigation'

interface UploadDocumentsPageProps {
  programRequirement: IRequirementProgram[]
  programBanner?: IProgramBanner | null
  userAuth: IUserAuth
  application_id: string
}

export const UploadDocumentsPage = (props: UploadDocumentsPageProps) => {
  const { programRequirement, application_id } = props
  const [isLoading, setIsLoading] = useState(false)

  const router = useRouter()
  const pathname = usePathname()

  function handleSaveApplication() {
    setIsLoading(true)
    toast.success(
      <ToastCustom
        title="Postulación guardada"
        description="Tu postulación ha sido guardada correctamente"
      />
    )
    setIsLoading(false)
    router.push(`${pathname}/success`)
  }

  return (
    <main className="flex flex-col gap-4 lg:gap-6 w-full max-w-4xl">
      {programRequirement.map((requirement) => (
        <section
          key={requirement.id}
          className="p-4 sm:p-6 bg-white border-2 border-gray-200 rounded-s-md w-full"
        >
          <header className="flex flex-col gap-2">
            <h2 className="text-lg font-bold">{requirement.name}</h2>
            <div
              dangerouslySetInnerHTML={{ __html: requirement.description }}
              className="text-sm text-gray-600 space-y-1 pb-2"
            />
            <Link
              href={`${requirement.requeriment_file}` || '#'}
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary-500"
              target="_blank"
            >
              <FileText className="h-4 w-4" />
              <span>
                Archivo actual: {requirement.requeriment_file || 'No asignado'}
              </span>
            </Link>
          </header>

          <div className="mt-4">
            <UploadDocumentsModal
              applicationId={Number(application_id)}
              requirementId={Number(requirement.id)}
              promotionConvocatoryId={Number(
                requirement?.promotion_convocatory_requirement_id
              )}
            />
          </div>
        </section>
      ))}
      <footer className="flex flex-col gap-4">
        <Button
          className="mt-4 bg-primary-800"
          disabled={isLoading}
          onClick={handleSaveApplication}
        >
          Guardar postulación
        </Button>
      </footer>
    </main>
  )
}
