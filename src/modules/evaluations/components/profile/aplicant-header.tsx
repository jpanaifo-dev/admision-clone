import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'

interface ApplicantHeaderProps {
  name: string
  program: string
  status: string
}

export function ApplicantHeader({
  name,
  program,
  status,
}: ApplicantHeaderProps) {
  function splitName(name: string) {
    if (!name) return ''
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
  }

  return (
    <div className="flex items-start gap-4 border-b p-4">
      <Avatar className="h-16 w-16">
        <AvatarFallback className="bg-gray-100 text-gray-400">
          {splitName(name)}
        </AvatarFallback>
      </Avatar>
      <div className="space-y-1">
        <h1 className="text-xl font-semibold">{name}</h1>
        <Badge
          variant="secondary"
          className="bg-orange-100 text-orange-700"
        >
          {status}
        </Badge>
        <p className="text-sm text-gray-500">{program}</p>
      </div>
    </div>
  )
}
