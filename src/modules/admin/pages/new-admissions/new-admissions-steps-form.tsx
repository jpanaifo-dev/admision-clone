import { HeaderSection } from "@/components/app";
import { BasicInfoStep } from "./steps";

export default function NewAdmissionStepsForm() {

    return (
        <>
            <HeaderSection
                title="Configurar la información básica"
                description="Para empezar, rellene información básica sobre el usuario que va a agregar"
                disabledActions
            />
            <BasicInfoStep />
        </>
    )
}
