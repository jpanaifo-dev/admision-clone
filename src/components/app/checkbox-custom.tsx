'use client'
import { Checkbox } from '@/components/ui/checkbox'

interface CheckboxCustomProps {
  id?: string
  label?: string
  description?: string
  variant?: 'default' | 'bordered' | 'flat'
  color?: 'default' | 'success' | 'danger' | 'warning'
  value?: boolean
  onChange?: (value: boolean) => void
}

const colorClasses = {
  default: {
    default: 'text-gray-900',
    bordered: 'border-gray-300 text-gray-900',
    flat: 'text-gray-900',
  },
  success: {
    default: 'text-success-600',
    bordered: 'border-success-600 text-success-600',
    flat: 'text-success-600 bg-success-50',
  },
  danger: {
    default: 'text-danger-600',
    bordered: 'border-danger-600 text-danger-600',
    flat: 'text-danger-600 bg-danger-50',
  },
  warning: {
    default: 'text-warning-600',
    bordered: 'border-warning-600 text-warning-600',
    flat: 'text-warning-600 bg-warning-50',
  },
}

export const CheckboxCustom = ({
  id,
  label,
  description,
  variant = 'default',
  color = 'default',
  value,
  onChange,
}: CheckboxCustomProps) => {
  const colorStyle = colorClasses[color][variant]

  return (
    <div className={`flex items-top space-x-2 p-4 rounded-sm border ${colorStyle}`}>
      <Checkbox
        id={id || 'terms-checkbox'}
        checked={value}
        onCheckedChange={onChange}
      />
      <div className="grid gap-1.5 leading-none">
        {label && (
          <label
            htmlFor={id || 'terms-checkbox'}
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {label}
          </label>
        )}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
    </div>
  )
}
