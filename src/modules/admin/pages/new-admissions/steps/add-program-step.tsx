import { HeaderSection } from "@/components/app";
import DualSelector from "../components/dual-selector";
import { SelectorProgramProvider } from "../context/selector-program-context";

export default function AddProgramStep() {
    return (
        <>
            <SelectorProgramProvider>
                <HeaderSection
                    title="Seleccionar programas"
                    description="Selecciona los programas que se asignarán a la convocatoria"
                    disabledActions
                />
                <section>
                    <DualSelector />
                </section>
            </SelectorProgramProvider>
        </>
    )
}
