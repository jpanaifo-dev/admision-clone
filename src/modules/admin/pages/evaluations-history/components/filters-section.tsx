"use client";

import { DatePickerCustom } from "@/components/app";
import { CommandFilter, SearchFilter } from "@/components/app/filters";
import { useFilterFromUrl } from "@/lib/filter-url";

const filtersValue = [
    { value: "true", label: "Activo" },
    { value: "false", label: "Inactivo" },
];

interface IFiltersSection {
    filters?: Array<"status" | "type" | "datePicker">;
}

export default function FiltersSection(props: IFiltersSection) {
    const { filters = [] } = props;

    const { getParams } = useFilterFromUrl();

    const hasFilter = (filterKey: "status" | "type" | "datePicker") =>
        filters.includes(filterKey);

    const newStatus = getParams({ key: "status", value: "" });
    const newType = getParams({ key: "type", value: "" });

    return (
        <section className="flex justify-between gap-4 w-full overflow-x-auto xl:overflow-x-hidden">
            <div className="flex gap-2">
                <SearchFilter placeholder="Buscar" icon className="min-w-[190px]" />
            </div>
            <div className="flex gap-2">
                {hasFilter("status") && (
                    <CommandFilter
                        filterKey="status"
                        label="Estado"
                        data={filtersValue}
                        searchParam={{ initialStatus: newStatus }}
                    />
                )}
                {hasFilter("type") && (
                    <CommandFilter
                        filterKey="type"
                        label="Tipo"
                        data={filtersValue}
                        searchParam={{ initialStatus: newType }}
                    />
                )}
                {hasFilter("datePicker") && <DatePickerCustom className="w-full" />}
            </div>
        </section>
    );
}
