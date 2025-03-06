'use client'

import { Card } from "@/components/ui/card"
import { FileText, ExternalLink, Star } from "lucide-react"
import { useState } from "react"

interface DocumentPreviewProps {
    title: string
    size: string
    format: string
    rating?: number
    maxRating: number
    onView?: () => void
}

export const DocumentPreview = (props: DocumentPreviewProps) => {
    const { title, size, format, rating = 0, maxRating, onView } = props
    const [currentRating, setCurrentRating] = useState(rating)
    const [hoverRating, setHoverRating] = useState<number | null>(null)

    const handleRating = (newRating: number) => {
        setCurrentRating(newRating)
    }

    return (
        <Card className="p-4 flex items-center gap-4">
            <div className="shrink-0 shadow-xl rounded-md p-2">
                <FileText className="h-8 w-8 text-gray-500" />
            </div>
            <div className="flex flex-col w-full">
                <section className="flex justify-between w-full">
                    <h3 className="font-medium text-sm">{title}</h3>
                    <div className="flex items-center gap-1 text-sm text-gray-600">
                        <div className="flex">
                            {[...Array(maxRating)].map((_, i) => (
                                <Star
                                    key={i}
                                    onClick={() => handleRating(i + 1)}
                                    onMouseEnter={() => setHoverRating(i + 1)}
                                    onMouseLeave={() => setHoverRating(null)}
                                    className={`h-4 w-4 cursor-pointer ${
                                        (hoverRating ?? currentRating) > i
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-200"
                                    }`}
                                />
                            ))}
                        </div>
                        <span>
                            ({currentRating} de {maxRating})
                        </span>
                    </div>
                </section>
                <div className="flex flex-col gap-2 text-sm text-gray-500">
                    <span>
                        Tamaño: {size} | Formato: {format}
                    </span>
                    <button
                        onClick={onView}
                        className="text-blue-600 hover:text-blue-700 flex items-center gap-1"
                    >
                        Ver documento
                        <ExternalLink className="h-3 w-3" />
                    </button>
                </div>
            </div>
        </Card>
    )
}
