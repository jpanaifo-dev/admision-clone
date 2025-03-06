import { BannerSection } from '@/components/intranet'

interface LayoutStudentProps {
  title: string
  subtitle?: string
  children?: React.ReactNode
}

export const LayoutStudent = (props: LayoutStudentProps) => {
  const { title, subtitle, children } = props

  return (
    <>
      <BannerSection
        title={title}
        subtitle={subtitle}
      />
      <main className={`bg-primary-50 `}>
        <article className="container py-8 sm:p-10 lg:py-12 h-full">
          {children}
        </article>
      </main>
      <footer>
        <div className="container py-4 text-center text-primary-900">
          <p>© {new Date().getFullYear()} Escuela de Postgrado UNAP</p>
        </div>
      </footer>
    </>
  )
}
