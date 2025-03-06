import { IStepper } from '@/components/app/multi-step-timeline'
import { Button } from '@/components/ui/button'

interface SideNavProps {
    steps: IStepper[]
    selectedStep?: string | null
    setSelectedStep?: (index: string) => void
}

export const SideNav = (props: SideNavProps) => {
    const { steps, selectedStep, setSelectedStep } = props

    return (
        <>
            <div className="w-full md:w-64 flex-shrink-0 md:border-r md:border-gray-200 md:pr-4">
                <h2 className="font-bold my-4">Detalles</h2>
                <div
                    className="
                    flex flex-row md:flex-col 
                    gap-2 md:gap-4 
                    overflow-x-auto md:overflow-x-visible 
                    scrollbar-hidden
                "
                >
                    {steps.map((step) => (
                        <Button
                            key={step.id}
                            variant={selectedStep === step.id ? 'default' : 'secondary'}
                            onClick={() => setSelectedStep && setSelectedStep(step.id)}
                            className="whitespace-nowrap"
                        >
                            {step.title}
                        </Button>
                    ))}
                </div>
            </div>
        </>
    )
}
