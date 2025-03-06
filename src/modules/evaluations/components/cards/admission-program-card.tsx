'use client'
import { ChevronRight, GraduationCap } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

interface ProgramCardProps {
  title: string
  studyPlanCode: string
  applicants: number
  status: 'Activo' | 'Inactivo'
}

export const AdmissionProgramCard = ({
  title,
  studyPlanCode,
  applicants,
  status,
}: ProgramCardProps) => {
  const pathname = usePathname()
  const href = `${pathname}/${title.toLowerCase().replace(' ', '-')}`
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
        <Link href={href} className='hover:underline'>
          <CardTitle className="text-base font-bold">{title}</CardTitle>
        </Link>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">{studyPlanCode}</p>
        <div className="text-sm flex items-center gap-2 text-muted-foreground justify-between">
          <div className='flex gap-2 items-center'>
            <GraduationCap className="h-4 w-4 text-primary-700" />
            <span>{applicants.toLocaleString()} postulanteas</span>
          </div>
          <Link href={href}>
            <Button
              variant="outline"
              size="sm"
              className="text-sm"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}
