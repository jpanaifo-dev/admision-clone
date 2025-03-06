'use client'
import { MultiStepTimeline } from '@/components/app'
import {
  UserInfoBasic,
  UserRolesData,
  UserModulesData,
  UserAuthFinally,
} from './sections'

import { IStepper } from '@/components/app/multi-step-timeline'
import { useState } from 'react'
import { LayoutFormContent } from '@/components/layouts'

const steps: IStepper[] = [
  {
    id: 'user-info-basic',
    title: 'Información básica',
  },
  {
    id: 'user-roles-data',
    title: 'Roles de usuario',
  },
  {
    id: 'user-modules-data',
    title: 'Módulos de usuario',
  },
  {
    id: 'user-create-finish',
    title: 'Crear usuario y terminar',
  },
]

export const FrmUserEditor = () => {
  const [selectedStep, setSelectedStep] = useState<string>(steps[0].id)
  // const [isStepValid, setIsStepValid] = useState<boolean>(false)

  // const currentStepIndex = steps.findIndex((step) => step.id === selectedStep)
  // const isLastStep = currentStepIndex === steps.length - 1

  // const handleNext = () => {
  //   if (isStepValid) {
  //     setSelectedStep(steps[currentStepIndex + 1].id)
  //     setIsStepValid(false) // Reset validation for the next step
  //   } else {
  //     alert('Por favor, complete todos los campos requeridos.')
  //   }
  // }

  // const validateStep = (isValid: boolean) => {
  //   setIsStepValid(isValid)
  // }

  return (
    <div>
      <LayoutFormContent title="Nuevo usuario">
        <main className="flex flex-col sm:flex-row">
          <aside className="sm:min-w-[320px] py-4">
            <MultiStepTimeline
              steps={steps}
              selectedStep={selectedStep}
              setSelectedStep={setSelectedStep}
            />
          </aside>
          <div className="hidden sm:block mx-4 border-l border-gray-300 min-h-full"></div>
          {selectedStep === 'user-info-basic' && <UserInfoBasic />}
          {selectedStep === 'user-roles-data' && <UserRolesData />}
          {selectedStep === 'user-modules-data' && <UserModulesData />}
          {selectedStep === 'user-create-finish' && <UserAuthFinally />}
        </main>
      </LayoutFormContent>
    </div>
  )
}
