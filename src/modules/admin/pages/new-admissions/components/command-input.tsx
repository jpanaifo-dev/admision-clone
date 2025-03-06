"use client"

import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

const requirements = [
    {
        value: "CV - Hoja de vida",
        label: "CV - Hoja de vida",
    },
    {
        value: "Recibo de luz",
        label: "Recibo de luz",
    },
    {
        value: "Constancia de extranjero",
        label: "Constancia de extranjero",
    },
    {
        value: "Constancia de estudios",
        label: "Constancia de estudios",
    },
    {
        value: "Constancia de trabajo",
        label: "Constancia de trabajo",
    },
]

export function SearchCommandInput() {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    {value
                        ? requirements.find((framework) => framework.value === value)?.label
                        : "Buscar requisito..."}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full md:w-96 lg:w-[820px]">
                <Command
                    className="w-full"
                >
                    <CommandInput className="w-full" placeholder="Buscar requisito..." />
                    <CommandList
                        className="w-full"
                    >
                        <CommandEmpty>No se encontraron resultados</CommandEmpty>
                        <CommandGroup>
                            {requirements.map((framework) => (
                                <CommandItem
                                    key={framework.value}
                                    value={framework.value}
                                    onSelect={(currentValue) => {
                                        setValue(currentValue === value ? "" : currentValue)
                                        setOpen(false)
                                    }}
                                >
                                    {framework.label}
                                    <Check
                                        className={cn(
                                            "ml-auto",
                                            value === framework.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
