import { IStepper } from "@/components/app/multi-step-timeline";
// import CreateTimelineStep from "./create-timeline-step";
import AddProgramStep from "./add-program-step";
import RequirementsStep from "./requirements-step";
import BasicInfoStep from "./basic-info-step";

export const convocationSteps: IStepper[] = [
    {
        id: '1',
        title: 'Información básica',
        description: 'Descripción del paso 1',
        content: <BasicInfoStep />,
        href: '/admin/convocatorias/nuevo',
    },
    // {
    //     id: '2',
    //     title: 'Creación de cronograma',
    //     description: 'Descripción del paso 2',
    //     content: <CreateTimelineStep />,
    //     href: '`/admin/convocatorias/nuevo/${id}/editar`',
    // },
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