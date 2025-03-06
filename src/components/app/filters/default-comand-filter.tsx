"use client";

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useEffect, useState } from "react";
import { useFilterFromUrl } from "@/lib/filter-url";

type searchParams = {
  initialStatus?: string;
};

type Status = {
  value: string;
  label: string;
};

type IData = {
  value: string;
  label: string;
};

interface IProps {
  filterKey: string;
  placeholder?: string;
  className?: string;
  popclassName?: string;
  hasSearch?: boolean;
  searchParam?: searchParams;
  data?: IData[];
}

export const SimpleComboBox = (props: IProps) => {
  const {
    filterKey,
    placeholder,
    data,
    className,
    popclassName,
    hasSearch,
    searchParam,
  } = props;

  const { createFilter, removeFilter } = useFilterFromUrl();

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const [selectedStatus, setSelectedStatus] = useState<Status | null>(
    searchParam?.initialStatus
      ? data?.find((item) => item.value === searchParam.initialStatus) || null
      : null
  );

  useEffect(() => {
    if (selectedStatus) {
      createFilter({ key: filterKey, value: selectedStatus.value });
    } else {
      removeFilter({ key: filterKey });
    }
  }, [selectedStatus, createFilter, removeFilter, filterKey]);

  return (
    <>
      <div className={cn("w-full", className)}>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className={cn("w-full justify-between", popclassName)}
            >
              {selectedStatus ? (
                <>
                  <div className="flex items-center justify-between w-full text-sm font-semibold">
                    {selectedStatus.label}
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between w-full text-sm font-semibold">
                    {selectedStatus || "Todos"}
                  </div>
                </>
              )}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className={cn("w-full p-0", popclassName)}>
            <Command>
              {hasSearch && (
                <CommandInput
                  placeholder={placeholder || "Buscar..."}
                  className="h-9"
                />
              )}
              <CommandList>
                <CommandEmpty>No item found.</CommandEmpty>
                <CommandGroup>
                  {data?.map((item) => (
                    <CommandItem
                      key={item.value}
                      value={
                        selectedStatus?.value === item.value ? "" : item.value
                      }
                      onSelect={(currentValue) => {
                        setSelectedStatus(
                          selectedStatus?.value === item.value
                            ? null
                            : (data?.find(
                                (item) => item.value === currentValue
                              ) as Status | null)
                        );
                        setValue(currentValue);
                        setOpen(false);
                      }}
                    >
                      {item.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === item.value ? "opacity-100" : "opacity-0"
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
    </>
  );
};
