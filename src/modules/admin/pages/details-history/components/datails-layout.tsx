'use client'

import { HeaderName } from './header-name'
import { PercentCard } from './percent-card'
import { SideNav } from './side-nav'
import { IStepper } from '@/components/app/multi-step-timeline'
import GeneralInformationPage from '../general-information-page'
import { useFilterFromUrl } from '@/lib/filter-url'
import ActivityCard from './trophe-card'
import { AttachedFiles } from '../attached-files'
import { PersonalHistory } from '../personal-history'

const steps: IStepper[] = [
    {
        id: '1',
        title: 'Información general',
        description: 'Información general del postulante',
        content: <GeneralInformationPage />
    },
    {
        id: '2',
        title: 'Archivos Adjuntos',
        description: 'Evaluación del postulante',
        content: <AttachedFiles />
    },
    {
        id: '3',
        title: 'Historial personal',
        description: 'Evaluación de la documentación',
        content: <PersonalHistory />
    },
]

export default function EvaluationDetailLayout() {
    const { getParams, createFilter } = useFilterFromUrl();

    const currentStep = getParams({ key: 'step', value: '' }) || steps[0].id;

    const handleSelectStep = (index: string) => {
        createFilter({ key: 'step', value: index });
    }

    const currentStepContent = steps.find(step => step.id === currentStep)?.content;

    return (
        <div className="min-h-screen bg-gray-50">
            <section className="flex flex-col lg:flex-row gap-6 p-4">
                <div className="flex-1 space-y-4">
                    <HeaderName
                        image="https://www.quantumfunding.co.uk/wp-content/uploads/2016/08/blank-profile-pic.jpg"
                        etapa="Etapa 2024 - II"
                        name="Alindor David Piña Irarica"
                        program="Maestría en geología industrial"
                        status="Estado del postulante"
                    />
                    <section>
                        {/* Main Content Area */}
                        <div className="w-full border-t border-gray-200">
                            <div className="flex flex-col md:flex-row gap-6">
                                {/* Left Sidebar */}
                                <SideNav
                                    steps={steps}
                                    selectedStep={currentStep}
                                    setSelectedStep={handleSelectStep}
                                />

                                <div className="flex-1 pt-4">
                                    {
                                        currentStepContent
                                    }
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

                <div className="w-full lg:w-80 flex-shrink-0 space-y-6">
                    <ActivityCard
                        description='La evaluación del postulante a sido concluida.'
                        score={30.4}
                        timestamp='10:40 AM, Fri 10 Sept 2021'
                        title='Evaluación del postulante'
                    />

                    <PercentCard />
                </div>
            </section>
        </div>
    )
}

