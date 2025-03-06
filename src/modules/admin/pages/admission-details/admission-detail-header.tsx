'use client'

import {Card} from "@/components/ui/card"
import {BackButton} from "@/utils/back-button"

export default function ApplicationDetailsHeader() {
    return (
        <section className="py-4">
            <Card className="p-6 rounded-sm bg-background shadow-none">
                <div className="space-y-6">
                    <div className="flex items-center gap-4">
                        <BackButton variant={"outline"}/>
                        <h2 className="text-xl font-semibold">Postulación</h2>
                    </div>


                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 xl:ml-14">
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Etapa</h3>
                                <p className="mt-1">Convocatoria Admisión Verano 2024 - I</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Programa</h3>
                                <p className="mt-1">Doctorado - Doctorado en Ingeniería de sistemas</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Plan de estudios</h3>
                                <p className="mt-1">Plan de estudios 2024 - II</p>
                            </div>

                            <div>
                                <h3 className="text-sm font-medium text-gray-500">Año</h3>
                                <p className="mt-1">13, diciembre del 2024</p>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </section>
    )
}

