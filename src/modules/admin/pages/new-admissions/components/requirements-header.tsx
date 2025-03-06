"use client"

import { Badge } from "@/components/ui/badge"
import { CreateRequirementDialog } from './create-requirement-dialog'

export default function RequirementsHeader() {
    return (
        <div className="w-full pb-8">
            <div className="flex items-center justify-between mb-2">
                <h2 className="text-xl font-semibold text-gray-900">Requisitos generales</h2>
                <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">Cantidad / Evaluación</span>
                    <Badge variant="secondary" className="bg-orange-100/50 text-orange-800 hover:bg-orange-100/50">
                        20 de 100%
                    </Badge>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2 text-sm text-gray-600">
                <span>Registra la lista de requisitos |</span>
                <CreateRequirementDialog />
            </div>
        </div>
    )
}
