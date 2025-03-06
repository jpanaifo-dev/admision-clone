import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Building2, GraduationCap, ScrollText } from 'lucide-react'

interface EducationCardProps {
    variant?: 'education' | 'work' | 'certification'
    title: string
    startDate: string
    endDate: string
    university: string
    status: string
    diplomaDate: string
}

export const EducationCard = (props: EducationCardProps) => {
    const {title, startDate, endDate, university, status, diplomaDate, variant} = props
    return (
        <Card className="p-4">
            <div className="space-y-3">
                <div className="flex items-start gap-3">
                    <div className="shrink-0 mt-1 shadow-xl rounded-md p-2">
                        {
                            variant === "education" && <GraduationCap className="h-6 w-6 text-gray-500" />}
                        {variant === "work" && <Building2 className="h-6 w-6 text-gray-500" />}
                        {variant === "certification" && <ScrollText className="h-6 w-6 text-gray-500" />}
                    </div>
                    <div className="space-y-1">
                        <h3 className="font-bold text-base">{title}</h3>
                        <p className="text-xs text-gray-600">
                            Desde el {startDate} al {endDate}
                        </p>
                        <p className="text-sm font-semibold text-gray-600">{university}</p>
                    </div>
                </div>

                <div className="pl-9 flex items-center gap-2 text-sm text-gray-600">
                    <Badge className="bg-slate-200 text-gray-500">{status}</Badge>
                    <Badge className="bg-slate-200 text-gray-500 flex gap-1">
                        {' '}
                        <ScrollText className="w-4 h-4" /> Diploma con fecha: {diplomaDate}
                    </Badge>
                </div>
            </div>
        </Card>
    )
}
