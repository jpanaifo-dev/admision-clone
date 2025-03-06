'use client'

import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface IProps {
    className?: string
    variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | null | undefined
    label?: string
}

export const BackButton = (
    { className, variant = "link", label }: IProps
) => {
    const pathname = usePathname()
    const pathBack = pathname.split('/').slice(0, -1).join('/')

    return (
        <Link
            href={pathBack}
        >
            <Button
                variant={variant}
                className={cn("px-3", className)}
            >
                <ArrowLeft className="w-4 h-4" />
                {label && <span className="ml-2">{label}</span>}
            </Button>
        </Link>
    )
}
