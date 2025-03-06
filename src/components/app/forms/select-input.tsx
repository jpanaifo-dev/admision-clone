import * as React from "react";
import { cn } from '@/lib/utils'


import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface IProps {
    options: { label: string; value: string }[];
    placeholder?: string;
    value: string;
    onChange: (value: string) => void;
    label?: string;
    className?: string;
}

export default function CustomSelectInput(props: IProps) {
    const { options, placeholder, value, onChange, label, className } = props;

    return (
        <>
            <Select value={value} onValueChange={onChange}>
                <SelectTrigger className={cn("w-full", className)}>
                    <SelectValue placeholder={placeholder || "Seleccionar"} />
                </SelectTrigger>
                <SelectContent>
                    {label && (
                        <SelectGroup>
                            <SelectLabel>{label}</SelectLabel>
                        </SelectGroup>
                    )}
                    <SelectGroup>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </>
    );
}
