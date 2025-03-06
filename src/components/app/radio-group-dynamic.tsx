import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Label } from '../ui/label'
import React from 'react'

interface RadioGroupDynamicProps {
  value?: string
  defaultValue?: string
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
  showWrapper?: boolean
  children: React.ReactNode
}

export const RadioGroupDynamic = ({
  defaultValue,
  value,
  onChange,
  children,
}: RadioGroupDynamicProps) => {
  return (
    <RadioGroup
      defaultValue={defaultValue}
      value={value}
      onChange={onChange}
    >
      {children}
    </RadioGroup>
  )
}

interface RadioGroupItemProps {
  value: string
  id: string
  children?: React.ReactNode
  description?: string
  showWrapper?: boolean
}

export const RadioGroupDynamicItem = ({
  value,
  id,
  children,
  description,
  showWrapper,
}: RadioGroupItemProps) => {
  return (
    <div
      className={`flex items-center space-x-3 ${
        showWrapper && 'border p-3 bg-white rounded-lg'
      } `}
    >
      <RadioGroupItem
        value={value}
        id={id}
      />
      <section>
        {children && <Label htmlFor={id}>{children}</Label>}
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </section>
    </div>
  )
}
