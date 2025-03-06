'use client'

import { DatePickerCustom } from '@/components/app'
import { CommandFilter, SearchFilter } from '@/components/app/filters'
import { useFilterFromUrl } from '@/lib/filter-url'

const filters = [
    { value: 'active', label: 'Activo' },
    { value: 'inactive', label: 'Inactivo' },
    { value: 'pending', label: 'Pendiente' },
    { value: 'canceled', label: 'Cancelado' },
]

export default function FiltersSection() {
    const { getParams } = useFilterFromUrl()

    const newStatus = getParams({ key: 'status', value: '' })
    const newType = getParams({ key: 'type', value: '' })


    return (
        <section className="flex justify-between gap-4 w-full overflow-x-auto xl:overflow-x-hidden">
            <div className="flex gap-2">
                <DatePickerCustom className="w-full" />
                <CommandFilter
                    filterKey='status'
                    label='Estado'
                    data={filters}
                    searchParam={{ initialStatus: newStatus }}
                />
            </div>
            <div className="flex gap-2">
                <CommandFilter
                    filterKey='type'
                    label='Tipo'
                    data={filters}
                    searchParam={{ initialStatus: newType }}
                />
                <SearchFilter placeholder="Buscar" icon className='min-w-[190px]' />
            </div>
        </section>
    )
}
