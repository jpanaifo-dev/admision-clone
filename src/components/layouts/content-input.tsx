interface LabelInputsProps {
  id?: string
  label: string
  description?: string
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
}

export const ContentInput = (props: LabelInputsProps) => {
  const { id, label, description, children, orientation = 'horizontal' } = props

  return (
    <section
      className={`grid gap-4 ${
        orientation === 'horizontal'
          ? 'grid-cols-1 sm:grid-cols-3'
          : 'grid-cols-1 sm:grid-cols-1'
      }`}
      id={id}
    >
      <div
        className={`col-span-1 ${
          orientation === 'horizontal' ? 'sm:col-span-1' : 'sm:col-span-1'
        }`}
      >
        <h3 className="text-sm font-bold">{label}</h3>
        {description && <p className="text-xs text-gray-500">{description}</p>}
      </div>
      <div
        className={`col-span-1 ${
          orientation === 'horizontal' ? 'sm:col-span-2' : 'sm:col-span-1'
        }`}
      >
        {children}
      </div>
    </section>
  )
}
