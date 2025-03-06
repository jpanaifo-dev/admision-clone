import { StepTimeline } from "./steps-layout"

export default async function NewAdmissionLayout(
    { children, uuid }: {
        children: React.ReactNode,
        uuid: string
    }
) {


    const steps = [
        {
            id: '1',
            title: 'Información básica',
            description: 'Descripción del paso 1',
            href: uuid ? `/admin/convocatorias/${uuid}/editar` : `/admin/convocatorias/nuevo`,
        },
        {
            id: '2',
            title: 'Creación de cronograma',
            description: 'Descripción del paso 2',
            href: uuid ? `/admin/convocatorias/${uuid}/cronograma` : `/admin/convocatorias/nuevo/cronograma`,
        },
        {
            id: '3',
            title: 'Asignación de programas',
            description: 'Descripción del paso 3',
            href: uuid ? `/admin/convocatorias/${uuid}/programas` : `/admin/convocatorias/nuevo/programas`,
        },
    ]


    return (
        <div className="flex flex-col lg:flex-row w-full gap-4">
            <div className="h-fit xl:min-w-[240px] xl:w-80">
                <StepTimeline steps={steps} />
            </div>
            <div className="flex-grow">
                <main>{children}</main>
            </div>
        </div>
    )
}
