interface LabelItemProps {
    label: string
    content?: string
}

export const LabelItem = (props: LabelItemProps) => {
    const { label, content } = props

    return (
        <div>
            <h4 className="text-sm text-gray-600 mb-1">{label}</h4>
            <p>{content}</p>
        </div>
    )
}
