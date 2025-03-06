import { Switch } from '../ui/switch'

interface SwitchCustomProps {
  label?: string
  description?: string
  value?: boolean
  onChange?: (value: boolean) => void
}

export const SwitchCustom = (props: SwitchCustomProps) => {
  const {
    label = 'Security emails',
    description = 'Receive emails about your account security.',
    value,
    onChange,
  } = props
  return (
    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
      <div className="space-y-0.5">
        {label && <label className="text-base">{label}</label>}
        {description && <p className="text-sm text-gray-500">{description}</p>}
      </div>
      <section>
        <Switch
          checked={value}
          onCheckedChange={onChange}
          aria-readonly
        />
      </section>
    </div>
  )
}
