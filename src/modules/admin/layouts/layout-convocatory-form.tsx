'use client'
import { HeaderSection } from '@/components/app'
import {
  Stepper,
  StepperDescription,
  StepperIndicator,
  StepperItem,
  StepperSeparator,
  StepperTitle,
  StepperTrigger,
} from '@/components/ui/stepper'
import { ADMIN_URLS_APP } from '@/config/urls-data/admin.urls.config'
import { useRouter, usePathname } from 'next/navigation'
interface LayoutConvocatoryFormProps {
  uuid: string
  children: React.ReactNode
}

const steps = [
  {
    step: 1,
    title: 'Información básica',
    description: 'Completa la información básica de la convocatoria',
    href: (uuid: string | undefined) => {
      if (uuid) {
        return ADMIN_URLS_APP.CONVOCATORIES.EDIT(uuid)
      }
      return ADMIN_URLS_APP.CONVOCATORIES.CREATE
    },
  },
  {
    step: 2,
    title: 'Cronograma',
    description: 'Crear el cronograma de la convocatoria y sus etapas',
    href: (uuid: string) =>
      ADMIN_URLS_APP.CONVOCATORIES.CONVOCATORY_TIMELINE(uuid),
  },
  {
    step: 3,
    title: 'Asignación de programas',
    description: 'Selecciona los programas de la convocatoria',
    href: (uuid: string) =>
      ADMIN_URLS_APP.CONVOCATORIES.CONVOCATORY_PROGRAMS(uuid),
  },
]

export const LayoutConvocatoryForm = ({
  uuid,
  children,
}: LayoutConvocatoryFormProps) => {
  const router = useRouter()
  const pathname = usePathname()
  const hasUuid = !uuid

  const defaultValue =
    steps.find(({ href }) => pathname.includes(href(uuid)))?.step || 1

  const handleStep = (url: string) => {
    if (hasUuid) return
    router.push(url)
  }

  return (
    <div className="flex flex-col h-full max-w-5xl mx-auto gap-6">
      <HeaderSection
        title="Nueva convocatoria"
        disabledActions
      />
      <main className="mx-auto w-full">
        <div className="space-y-8 text-center items-center">
          <Stepper defaultValue={defaultValue}>
            {steps.map(({ step, title, description, href }) => (
              <StepperItem
                key={step}
                step={step}
                disabled={hasUuid && step > 1}
                className="relative flex-1 flex-col! items-center justify-center"
                onClick={() => handleStep(href(uuid))}
              >
                <StepperTrigger className="flex-col gap-3 rounded">
                  <StepperIndicator />
                  <div className="space-y-0.5 px-2">
                    <StepperTitle>{title}</StepperTitle>
                    <StepperDescription className="max-sm:hidden">
                      {description}
                    </StepperDescription>
                  </div>
                </StepperTrigger>
                {step < steps.length && (
                  <StepperSeparator className="absolute inset-x-0 top-3 left-[calc(50%+0.75rem+0.125rem)] -order-1 m-0 -translate-y-1/2 group-data-[orientation=horizontal]/stepper:w-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=horizontal]/stepper:flex-none" />
                )}
              </StepperItem>
            ))}
          </Stepper>
        </div>
      </main>
      {children}
    </div>
  )
}
