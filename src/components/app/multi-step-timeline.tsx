'use client'
import { Check } from 'lucide-react'

export interface IStepper {
  id: string
  title: string
  description?: string
  content?: React.ReactNode
  href?: string
}

interface MultiStepTimelineProps {
  steps: IStepper[]
  selectedStep?: string | null
  setSelectedStep?: (index: string) => void
}

export const MultiStepTimeline = (props: MultiStepTimelineProps) => {
  const { steps, selectedStep, setSelectedStep } = props

  return (
    <div className="w-full">
      <ol className="relative md:gap-12 flex items-start flex-row gap-4 md:flex-col overflow-x-auto md:whitespace-nowrap md:scrollbar-thin md:scrollbar-thumb-gray-300">
        {steps?.length === 0 && (
          <>
            <main className="h-20 flex items-center justify-center text-gray-500">
              <h1 className="text-sm text-gray-500">
                No hay pasos para mostrar
              </h1>
            </main>
          </>
        )}
        {steps?.length > 0 && (
          <>
            {steps?.map((step, index) => (
              <li
                key={step.id}
                className="flex items-start cursor-pointer"
                onClick={() => setSelectedStep && setSelectedStep(step.id)}
              >
                <div
                  className={`relative flex items-center justify-center ${step.description ? 'mt-4' : 'mt-2'
                    }`}
                >
                  <div
                    className={`w-5 h-5 z-10 flex items-center justify-center rounded-full transition-all duration-300 ease-in-out ${selectedStep === step.id
                      ? 'bg-primary-500 text-white transform'
                      : 'border-2 border-gray-400 bg-white'
                      }`}
                  >
                    {selectedStep === step.id && (
                      <Check className="w-3 h-3 text-white transition-transform duration-300 ease-in-out" />
                    )}
                  </div>
                  {index < steps?.length - 1 && (
                    <div
                      className={`
                       absolute w-0.5 bg-gray-300 left-1/2 transform ${step.description ? 'top-8 h-20' : 'top-4 h-16'
                        }
                      `}
                    ></div>
                  )}
                </div>
                <div className="ml-6 pt-1">
                  <h3
                    className={`${selectedStep === step.id
                      ? 'font-semibold text-primary-700'
                      : 'font-medium text-gray-500'
                      }`}
                  >
                    {step.title}
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 hidden md:block">
                    {step.description}
                  </p>
                </div>
              </li>
            ))}
          </>
        )}
      </ol>
    </div>
  )
}

