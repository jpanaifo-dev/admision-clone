/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react'
import { Input } from '@/components/ui/input'
import { Search } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> { }

export const InputSearch = React.forwardRef<HTMLInputElement, InputProps>(
  (props, ref) => {
    return (
      <div className="relative flex items-center w-full md:w-[300px] min-w-[250px]">
        <Search className="absolute left-3 text-gray-500" />
        <Input
          ref={ref}
          placeholder="Search"
          className="pl-10"
          {...props}
        />
      </div>
    )
  }
)

InputSearch.displayName = 'InputSearch'
