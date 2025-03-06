interface LayoutSectionPageProps {
  isBorder?: boolean
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  title?: string
  showDivider?: boolean
  description?: React.ReactNode
  children: React.ReactNode
}

export const LayoutSectionPage = (props: LayoutSectionPageProps) => {
  const { children, title, description, isBorder, radius, showDivider } = props
  return (
    <section
      className={`bg-white dark:bg-gray-800 ${
        isBorder ? 'border border-gray-200 dark:border-gray-700' : ''
      } ${radius ? `rounded-${radius}` : 'rounded-none'}`}
    >
      <header className={`flex flex-col gap-1 ${isBorder && 'p-4'}`}>
        <h1 className="text-xl font-bold text-gray-800 dark:text-gray-200">
          {title}
        </h1>
        {description && (
          <div className="text-sm text-gray-600 dark:text-gray-400">
            {description}
          </div>
        )}
      </header>
      {showDivider && (
        <hr className="border-t border-gray-200 dark:border-gray-700" />
      )}
      <main className={`flex flex-col gap-1 ${isBorder && 'p-4'}`}>
        {children}
      </main>
    </section>
  )
}
