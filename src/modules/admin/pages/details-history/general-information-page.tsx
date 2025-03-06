import { LabelItem } from "./components/label-item"

export default function GeneralInformationPage() {
    return (
        <>
            <section className="p-4 border rounded-sm mb-8">
                <h3 className="font-bold text-lg mb-4">Postulación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <LabelItem label="Etapa" content="Convocatoria Admisión Verano 2024 - I" />
                    <LabelItem label="Plan de estudios" content="Plan de estudios 2024 - II" />
                    <LabelItem label="Programa" content="Doctorado en Ingeniería de sistemas" />
                    <LabelItem label="Año académico" content="13 diciembre del 2024" />
                </div>
            </section>

            {/* Información personal Section */}
            <section className="p-4 border rounded-sm mb-8">
                <h3 className="font-bold text-lg mb-4">Información personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <LabelItem label="Tipo - N° documento" content="DNI - 78223744" />
                    <LabelItem label="Nombres" content="Daniel Fidencio Emeregido" />
                    <LabelItem label="Primer apellido" content="Quispe" />
                    <LabelItem label="Segundo apellido" content="Dos Santos" />
                </div>
            </section>

            {/* Información de contacto Section */}
            <section className="p-4 border rounded-sm mb-8">
                <h3 className="font-bold text-lg mb-4">Información de contacto</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <LabelItem label="Ubigeo - Dirección" content="Calle las verdientes Mz D lt 16" />
                    <LabelItem label="Correo electrónico" content="danielito@gmail.com" />
                    <LabelItem label="Teléfono o Celular" content="+51 963 852 741" />
                    <LabelItem label="WhatsApp" content="+51 963 852 741" />
                    <LabelItem label="Estado Civil" content="Soltero" />
                    <LabelItem label="Fecha de nacimiento" content="16 - 12 - 2024" />
                    <LabelItem label="Lugar de nacimiento" content="160016 - Iquitos, Perú" />
                </div>
            </section>
        </>
    )
}
