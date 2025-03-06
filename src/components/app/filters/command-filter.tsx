'use client'

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
import { useFilterFromUrl } from "@/lib/filter-url"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronDown, Check } from "lucide-react"

type searchParams = {
    initialStatus?: string
}


type Status = {
    value: string
    label: string
}

type IData = {
    value: string;
    label: string;
}

interface IProps {
    filterKey: string
    label?: string
    placeholder?: string
    className?: string
    popclassName?: string
    hasSearch?: boolean
    searchParam?: searchParams
    data?: IData[]
    startIcon?: JSX.Element
}

export const CommandFilter = (props: IProps) => {
    const { filterKey, label, placeholder, data, className, popclassName, hasSearch, searchParam, startIcon } = props

    const { createFilter, removeFilter } = useFilterFromUrl()

    const [open, setOpen] = useState(false)
    const [selectedStatus, setSelectedStatus] = useState<Status | null>(
        searchParam?.initialStatus ? data?.find((item) => item.value === searchParam.initialStatus) || null : null
    )

    useEffect(() => {
        if (selectedStatus) {
            createFilter({ key: filterKey, value: selectedStatus.value })
        } else {
            removeFilter({ key: filterKey })
        }
    }, [selectedStatus, createFilter, removeFilter, filterKey])

    return (
        <div
            className={cn("border border-input bg-background w-full md:w-[230px] min-w-[190px] flex items-start justify-between rounded-md pl-4 sm:flex-row sm:items-center gap-1", className)}
        >
            <div className="w-full flex justify-start gap-2 text-sm text-muted-foreground pt-2 md:pt-0">
                {startIcon && startIcon}
                {label || "Select"}
            </div>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button
                        variant="outline"
                        size="sm"
                        className={cn("md:w-[150px] justify-start border-none text-left font-normal", popclassName)}
                    >
                        {selectedStatus ? (
                            <>
                                <div className="flex items-center justify-between w-full text-sm font-semibold">
                                    {selectedStatus.label}
                                    <ChevronDown className="mr-2 h-4 w-4 shrink-0" />
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="flex items-center justify-between w-full text-sm font-semibold">
                                    {selectedStatus || "Todos"}
                                    <ChevronDown className="h-4 w-4 opacity-50" />
                                </div>
                            </>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent
                    className={cn("w-[150px] p-0", popclassName)}
                    side="bottom"
                    align="start"
                >
                    <Command>
                        {hasSearch && <CommandInput placeholder={placeholder || 'Seleccionar'} />}
                        <CommandList>
                            <CommandEmpty>No results found.</CommandEmpty>
                            <CommandGroup>
                                {data?.map((status) => (
                                    <CommandItem
                                        key={status.value}
                                        value={status.value}
                                        onSelect={(value) => {
                                            setSelectedStatus(
                                                selectedStatus?.value === value ? null : data?.find((item) => item.value === value) || null
                                            )
                                            setOpen(false)
                                        }}
                                    >
                                        {status.label}
                                        <Check
                                            className={cn(
                                                "ml-auto",
                                                selectedStatus?.value === status.value ? "opacity-100" : "opacity-0"
                                            )}
                                        />
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>
                </PopoverContent>
            </Popover>
        </div>
    )
}
