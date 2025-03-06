'use client'

import { MultiStepTimeline } from "@/components/app";
import { useFilterFromUrl } from "@/lib/filter-url";
import { LayoutFormContent } from "@/components/layouts";
import { buttonLabels } from "@/lib/constants";
import { convocationSteps } from "./steps/new-admissions-steps";

export default function NewAdmissionStepsForm() {
    const { getParams, createFilter, removeFilter } = useFilterFromUrl();

    const currentStep = getParams({ key: 'step', value: '' }) || convocationSteps[0].id;

    const labelOnSubmit =
        currentStep === convocationSteps[convocationSteps.length - 1].id
            ? buttonLabels.labelSubmit.finish
            : buttonLabels.labelSubmit.next;
    const labelOnCancel =
        currentStep === convocationSteps[0].id
            ? buttonLabels.labelCancel.cancel
            : buttonLabels.labelCancel.back;

    const handleOnCancel = () => {
        if (currentStep === convocationSteps[0].id) {
            removeFilter({ key: 'step' });
        } else {
            const previousStepIndex = convocationSteps.findIndex(step => step.id === currentStep) - 1;
            const previousStepId = convocationSteps[previousStepIndex]?.id || convocationSteps[0].id;
            createFilter({ key: 'step', value: previousStepId });
        }
    };

    const handleSelectStep = (index: string) => {
        createFilter({ key: 'step', value: index });
    }

    const handleNextStep = () => {
        if (currentStep === convocationSteps[convocationSteps.length - 1].id) {
            // Save convocation
        } else {
            const nextStepIndex = convocationSteps.findIndex(step => step.id === currentStep) + 1;
            const nextStepId = convocationSteps[nextStepIndex]?.id || convocationSteps[convocationSteps.length - 1].id;
            createFilter({ key: 'step', value: nextStepId });
        }
    }

    const currentStepContent = convocationSteps.find(step => step.id === currentStep)?.content;

    return (
        <LayoutFormContent
            title="Nueva convocatoria"
            position="left"
            labelOnSubmit={labelOnSubmit}
            labelOnCancel={labelOnCancel}
            onCancel={handleOnCancel}
            onSubmit={handleNextStep}
        >
            <main className="flex flex-col md:flex-row w-full md:w-full justify-start items-start gap-4">
                <section className="md:w-1/4 md:block md:border-r md:border-gray-200 md:pr-2 w-full">
                    <MultiStepTimeline
                        steps={convocationSteps}
                        selectedStep={currentStep}
                        setSelectedStep={handleSelectStep}
                    />
                </section>
                <section className="w-full xl:pl-4">{currentStepContent}</section>
            </main>
        </LayoutFormContent>
    )
}
