import { IStepper } from "@/components/app/multi-step-timeline";
import BasicInfoStep from "./basic-info-step";
import CreateAdmissionStep from "./create-admission-step";
import AddProgramStep from "./add-program-step";
import RequirementsStep from "./requirements-step";

export const convocationSteps: IStepper[] = [
    {
        id: '1',
        title: 'Información básica',
        description: 'Descripción del paso 1',
        content: <BasicInfoStep />,
    },
    {
        id: '2',
        title: 'Creación de cronograma',
        description: 'Descripción del paso 2',
        content: <CreateAdmissionStep />,
    },
    {
        id: '3',
        title: 'Asignación de programas',
        description: 'Descripción del paso 3',
        content: <AddProgramStep />,
    },
    {
        id: '4',
        title: 'Requisitos',
        description: 'Descripción del paso 4',
        content: <RequirementsStep />,
    }
]