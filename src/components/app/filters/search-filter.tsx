'use client';

import { Search } from 'lucide-react'
import { useDebouncedCallback } from 'use-debounce';
import { Input } from '@/components/ui/input';
import { useFilterFromUrl } from '@/lib/filter-url';
import { cn } from '@/lib/utils';

interface IProps {
    placeholder?: string
    icon?: boolean
    className?: string
}

export const SearchFilter = ({ placeholder, icon, className }: IProps) => {

    const { createFilter, removeFilter, getParams } = useFilterFromUrl();
    const searchParams = getParams({ key: 'search', value: '' });

    const handleSearch = useDebouncedCallback((term: string) => {
        if (term) {
            createFilter({ key: 'search', value: term });
        } else {
            removeFilter({ key: 'search' });
        }
    }, 300);

    return (
        <div className={cn('relative flex items-center gap-2 w-full', className)}>
            {/* <div className="relative flex items-center gap-2 w-full"> */}
            {icon ? <Search className="absolute left-3 text-gray-500 h-4" /> : null}
            <Input
                className={icon ? 'pl-10' : ''}
                placeholder={placeholder || 'Buscar...'}
                onChange={(e) => {
                    handleSearch(e.target.value);
                }}
                defaultValue={searchParams?.toString()}
            />
        </div>
    );
}