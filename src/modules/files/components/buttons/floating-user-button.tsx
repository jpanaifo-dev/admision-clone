import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { User } from 'lucide-react'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'

export const FloatingUserButton = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Link
            href={ADMISSION_URLS_APP.PROFILE.URL_BASE}
            className="fixed bottom-28 right-8 flex items-center justify-center w-16 h-16 bg-blue-500 text-white rounded-full shadow-lg cursor-pointer"
          >
            <User className="w-6 h-6" />
          </Link>
        </TooltipTrigger>
        <TooltipContent>Volver al perfil</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
