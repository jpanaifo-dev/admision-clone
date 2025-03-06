import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function Loading() {
  return (
    <div className="w-full container p-4 space-y-6">
      {/* Search Controls */}
      <div className="flex gap-4 flex-col sm:flex-row">
        <Input
          className="w-full sm:w-80"
          placeholder="Buscar programas..."
          disabled
        />
        <Select disabled>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="MAESTRIA" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maestria">MAESTRIA</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card
            key={i}
            className="overflow-hidden"
          >
            {/* Image Skeleton */}
            <Skeleton className="w-full h-48" />

            <CardHeader className="space-y-4">
              {/* Badge */}
              <Skeleton className="h-6 w-24" />

              {/* Title */}
              <Skeleton className="h-8 w-full" />

              {/* Program Code */}
              <Skeleton className="h-5 w-3/4" />
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Description */}
              <Skeleton className="h-20 w-full" />

              {/* Program Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-28" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>

            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
