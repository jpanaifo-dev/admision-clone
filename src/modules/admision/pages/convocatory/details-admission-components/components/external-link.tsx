import { Button } from '@/components/ui/button'
import { ExternalLink } from 'lucide-react'

export const ExternalLinkButton = () => {
    return (
        <>
            <Button variant="link" className="text-blue-600 hover:text-blue-800">
                Actualizar información
                <ExternalLink className="ml-2 h-4 w-4" />
            </Button>
        </>
    )
}
