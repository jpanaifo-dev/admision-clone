import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

interface HeaderNameProps {
    image?: string
    name?: string
    program?: string
    etapa?: string
    status?: string
}

export const HeaderName = (props: HeaderNameProps) => {
    const { image, etapa, name, program, status } = props

    return (
        <Card className="p-4 flex flex-col md:flex-row items-center md:items-start gap-4 bg-transparent shadow-none">
            <Avatar className="w-24 h-24">
                <AvatarFallback className="bg-muted">
                    {
                        image
                            ? <Image
                                src={image || 'https://www.quantumfunding.co.uk/wp-content/uploads/2016/08/blank-profile-pic.jpg'}
                                alt={name || 'profile'}
                                width={96}
                                height={96}
                            />
                            : <span className="text-gray-400"></span>
                    }
                </AvatarFallback>
            </Avatar>
            <div className="space-y-2">
                <h2 className="text-xl font-bold">
                    {name}
                </h2>
                <Badge variant="secondary" className="bg-[#FFF3E0] text-[#E65100] hover:bg-[#FFE0B2] border-none">
                    {status}
                </Badge>
                <p className="text-muted-foreground text-sm">
                    {etapa} - {program}
                </p>
            </div>
        </Card>
    )
}
