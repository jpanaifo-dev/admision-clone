import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'

export const ButtonLinkAdd = (url: string, label: string) => (
  <>
    <Button
      variant="default"
      asChild
      className="items-center hidden sm:flex"
    >
      <Link
        href={`${url || '#'}`}
        className="flex items-center"
      >
        <Plus className="mr-2" />
        <p className="hidden sm:block">{label || 'Añadir'}</p>
      </Link>
    </Button>
    <Button
      variant="default"
      asChild
      className="items-center sm:hidden"
      size="icon"
    >
      <Link
        href={`${url || '#'}`}
        className="flex items-center px-4"
      >
        <Plus className="md:mr-2" />
      </Link>
    </Button>
  </>
)
