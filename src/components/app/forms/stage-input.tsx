import { Label } from "@/components/ui/label"

interface StageInputProps {
    description?: string
    label?: string
    input?: JSX.Element
}

export default function StageInput(props: StageInputProps) {
    const { description, label, input } = props

    return (
        <div className="flex flex-col gap-5">
            <div className="flex flex-col md:flex-row w-full">
                <div className="md:w-1/2 space-y-1">
                    <Label
                        htmlFor={label}
                        className="text-base font-semibold"
                    >
                        {label}
                    </Label>
                    {description &&
                        <div className="hidden md:block text-sm text-muted-foreground">
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

