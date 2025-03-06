import { cn } from '@/lib/utils'
import { Check } from 'lucide-react'

export interface Step {
  title: string
  description?: string
}

interface StepsProps {
  steps: Step[]
  currentStep: number
  className?: string
}

export const Steps = ({ steps, currentStep, className }: StepsProps) => {
  return (
    <div className={cn('w-full', className)}>
      <div className="relative flex justify-between gap-8">
        {steps.map((step, index) => {
          const isCompleted = currentStep > index + 1
          const isActive = currentStep === index + 1

          return (
            <div
              key={step.title}
              className="flex flex-col items-center relative z-10"
            >
              {/* Línea de conexión */}
              {index < steps.length - 1 && (
                <div
                  className={cn(
                    'absolute top-5 left-[calc(100%-1.5rem)] h-1 w-[calc(100%+1rem)] -z-10 transition-colors duration-300',
                    isCompleted ? 'bg-primary-800' : 'bg-gray-200'
                  )}
                />
              )}

              {/* Círculo */}
              <div
                className={cn(
                  'w-10 h-10 rounded-full border-2 flex items-center justify-center font-semibold text-sm transition-colors duration-300',
                  isCompleted
                    ? 'bg-primary-800 border-primary-800 text-white'
                    : isActive
                    ? 'border-primary-800 bg-white text-primary-800'
                    : 'border-gray-200 bg-gray-100 text-gray-400'
                )}
              >
                {isCompleted ? <Check className="w-5 h-5" /> : index + 1}
              </div>

              {/* Título */}
              <div className="mt-3 text-center">
                <h3
                  className={cn(
                    'text-base font-semibold',
                    isActive
                      ? 'text-primary-800'
                      : isCompleted
                      ? 'text-gray-900'
                      : 'text-gray-400'
                  )}
                >
                  {step.title}
                </h3>
                {step.description && (
                  <p
                    className={cn(
                      'text-xs mt-0.5',
                      isActive || isCompleted
                        ? 'text-gray-600'
                        : 'text-gray-400'
                    )}
                  >
                    {step.description}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
