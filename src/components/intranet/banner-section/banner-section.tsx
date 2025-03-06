interface BannerSectionProps {
  title: string
  subtitle?: string
}

export const BannerSection = (props: BannerSectionProps) => {
  const { title, subtitle } = props

  return (
    <section className="bg-primary-900">
      <section
        id="user-section"
        className="container text-white sm:h-56 min-h-56 flex items-center justify-start"
      >
        <div>
          <h1 className="text-3xl font-bold">{title || 'Title section'}</h1>
          {subtitle && (
            <h3 className="text-gray-400">{subtitle || 'Subtitle section'}</h3>
          )}
        </div>
      </section>
      <section
        id="card-section"
        className="bg-primary-50"
      >
        <main className="container"></main>
      </section>
    </section>
  )
}
