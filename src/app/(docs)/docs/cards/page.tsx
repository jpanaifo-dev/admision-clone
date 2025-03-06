import { DocumentPreview } from "@/modules/evaluations/components/cards/dowload-files"
import {EducationCard} from "@/modules/evaluations/components/cards/education-card"

export default function Cards() {
    return (
        <main className="flex flex-col gap-4 py-12 container justify-start">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <DocumentPreview
                    title="CV- Nombre del postulante"
                    size="2 MB"
                    format="pdf"
                    rating={4}
                    maxRating={5}
                />
                <DocumentPreview
                    title="CV- Nombre del postulante"
                    size="2 MB"
                    format="pdf"
                    rating={4}
                    maxRating={5}
                />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                <EducationCard
                    title="Bchr. Ingeniería de Sistemas e Informática"
                    startDate="20 de febrero 2024"
                    endDate="28 de marzo 2024"
                    university="Universidad Nacional de la Amazonia Peruana"
                    status="Egresado"
                    diplomaDate="20 - 11 - 2024"
                    variant="work"
                />
                <EducationCard
                    title="Bchr. Ingeniería de Sistemas e Informática"
                    startDate="20 de febrero 2024"
                    endDate="28 de marzo 2024"
                    university="Universidad Nacional de la Amazonia Peruana"
                    status="Egresado"
                    diplomaDate="20 - 11 - 2024"
                />
            </div>
        </main>
    )
}