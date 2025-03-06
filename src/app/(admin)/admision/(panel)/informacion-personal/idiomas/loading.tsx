import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { GraduationCap } from 'lucide-react'

export default function Loading() {
  return (
    <Card className="max-w-5xl border-none p-0">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="space-y-2">
          <CardTitle>
            <Skeleton className="h-6 w-32" />
          </CardTitle>
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-36" />
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Education entries - showing 5 items */}
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="flex items-start space-x-4 p-4 rounded-lg border"
          >
            <div className="flex-shrink-0 mt-1">
              <div className="h-8 w-8 rounded-lg bg-muted flex items-center justify-center">
                <GraduationCap className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="flex-grow space-y-2">
              <Skeleton className="h-5 w-3/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/3" />
              <div className="flex items-center space-x-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-4 w-4 rounded-full" />
                <Skeleton className="h-4 w-24" />
              </div>
            </div>
            <div className="flex-shrink-0">
              <Skeleton className="h-6 w-6" />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
