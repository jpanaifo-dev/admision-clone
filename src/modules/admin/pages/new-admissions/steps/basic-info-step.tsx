import { DatePickerCustom, HeaderSection, StageInput } from "@/components/app";
import { Input } from "@/components/ui/input";

export default function BasicInfoStep() {

    return (
        <>
            <HeaderSection
                title="Configurar la información básica"
                description="Para empezar, rellene información básica sobre el usuario que va a agregar"
                disabledActions
            />
            <section className="flex flex-col gap-8">
                <StageInput
                    label="Etapa"
                    description="Describa la etapa de la convocatoria"
                    input={
                        <Input
                            onChange={() => { }}
                            className="w-full"
                        />
                    }
                />
                <StageInput
                    label="Fecha de inicio"
                    description="Seleccione la fecha de inicio de la convocatoria"
                    input={
                        <DatePickerCustom className="w-full" />
                    }
                />
                <StageInput
                    label="Fecha de fin"
                    description="Seleccione la fecha de fin de la convocatoria"
                    input={
                        <DatePickerCustom className="w-full" />
                    }
                />
            </section>
        </>
    )
}
