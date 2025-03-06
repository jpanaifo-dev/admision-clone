import { Skeleton } from '@/components/ui/skeleton'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
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
    <div className="container space-y-6 py-10 sm:py-16">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Select disabled>
          <SelectTrigger className="w-full sm:w-40">
            <SelectValue placeholder="Todos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
          </SelectContent>
        </Select>

        <Select disabled>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Fecha de creación" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fecha">Fecha de creación</SelectItem>
          </SelectContent>
        </Select>

        <Input
          className="w-full sm:flex-1"
          placeholder="Buscar..."
          disabled
        />
      </div>

      {/* Application Card */}
      <Card className="bg-amber-50/50">
        <CardHeader className="space-y-4">
          {/* Application Date */}
          <Skeleton className="h-4 w-48" />

          {/* Application Title */}
          <div className="flex justify-between items-start">
            <div className="space-y-2">
              <Skeleton className="h-6 w-64" />
              <Skeleton className="h-4 w-72" />
            </div>
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Documents Section */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-48" />
            <div className="flex gap-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-20" />
            </div>
          </div>

          {/* Observations Section */}
          <div className="space-y-3">
            <Skeleton className="h-5 w-32" />
            <Skeleton className="h-4 w-36" />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
