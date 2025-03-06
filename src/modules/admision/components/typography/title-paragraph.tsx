import { cn } from "@/lib/utils"

interface IProps {
    className?: string
    text?: string
}

export const TitleParagraph = (
    { className, text }: IProps
) => {

    return (
        <h1
            className={cn(
                "text-lg font-bold text-default-foreground",
                className
            )}
        >
            {text || "Title Paragraph"}
        </h1>
    )
}
