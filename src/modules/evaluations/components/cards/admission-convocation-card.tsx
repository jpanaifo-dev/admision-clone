'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Calendar, ChevronRight, GraduationCap } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

interface AdmissionCardProps {
  title: string
  description: string
  startDate: string
  endDate: string
  programs: number
  status: string
}

export const AdmissionConvocationCard = ({
  title,
  description,
  startDate,
  endDate,
  programs,
  status,
}: AdmissionCardProps) => {
  const pathname = usePathname()
  const href = `${pathname}/${title.toLowerCase().replace(' ', '-')}`
  return (
    <Card className="w-full max-w-2xl">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-bold">
          <Link
            href={href}
            className="hover:underline"
          >
            {title}
          </Link>
        </CardTitle>
        <Badge
          variant="secondary"
          className="bg-green-100 text-green-800 hover:bg-green-100"
        >
          {status}
        </Badge>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-sm text-muted-foreground">{description}</p>
        <div className='flex items-end justify-between'>
          <section className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4 text-primary-700" />
              <span>
                Desde: {startDate} al {endDate}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-primary-700" />
              <span>{programs} programas</span>
            </div>
          </section>
          <section>
            <Link href={href}>
              <Button
                variant="outline"
                size="sm"
                className="text-sm"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </section>
        </div>
      </CardContent>
    </Card>
  )
}
