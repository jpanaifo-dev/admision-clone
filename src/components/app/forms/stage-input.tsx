import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

interface StageInputProps {
    description?: string
    label?: string
    input?: JSX.Element
    desClassNames?: string
}

export default function StageInput(props: StageInputProps) {
    const { description, label, input, desClassNames } = props

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row w-full">
                <div className="md:w-1/2 space-y-1">
                    <Label
                        htmlFor={label}
                        className="text-sm font-semibold"
                    >
                        {label}
                    </Label>
                    {description &&
                        <div className={cn("hidden md:block text-sm text-muted-foreground", desClassNames)}>
                            {description}
                        </div>
                    }
                </div>
                <div className="md:w-1/2">
                    {input}
                </div>
            </div>
            <hr className="border-gray-200" />
        </div>
    )
}

