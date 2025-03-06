import { cn } from "@/lib/utils";

interface IProps {
    label: string;
    children: React.ReactNode;
    className?: string;
    labelClassName?: string;
}

export default function FormField(props: IProps) {
    const { label, children, className, labelClassName } = props;

    return (
        <div className={cn("space-y-2", className)}>
            <label className={cn("text-sm font-medium leading-none", labelClassName)}>
                {label}
            </label>
            {children}
        </div>
    );
};