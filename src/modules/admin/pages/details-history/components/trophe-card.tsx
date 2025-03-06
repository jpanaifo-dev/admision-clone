import Image from 'next/image'
import { Card, CardHeader } from "@/components/ui/card"

interface ActivityCardProps {
    timestamp: string
    title: string
    description: string
    score: number
}

export default function ActivityCard({
    timestamp,
    title,
    description,
    score
}: ActivityCardProps) {
    return (
        <>
            <Card className="bg-primary-800 text-white p-0">
                <CardHeader
                    className='bg-primary-900 rounded-t rounded-sm py-4 px-6'
                >
                    Actividad reciente
                </CardHeader>
                <div className="p-6 space-y-4">
                    <div>
                        <div className="text-sm opacity-80">{timestamp}</div>
                        <h2 className="text-xl font-semibold mt-2">{title}</h2>
                        <p className="text-sm opacity-80 mt-1">
                            {description}
                        </p>
                    </div>
                    <div className="flex items-center justify-center gap-4">
                        <span className="text-5xl font-bold">{score}</span>
                        <Image src="/images/trophy.png" width={60} height={60} alt="medal" />
                    </div>
                </div>
            </Card>
        </>
    )
}

