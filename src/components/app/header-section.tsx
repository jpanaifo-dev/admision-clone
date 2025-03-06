import { Button } from '@/components/ui/button'
import { Plus, RefreshCw, Download } from 'lucide-react'
import Link from 'next/link'

interface HeaderSectionProps {
  title?: string
  description?: string
  showDivider?: boolean
  disabledActions?: boolean
  children?: never
  showAddButton?: boolean
  showRefreshButton?: boolean
  showExportButton?: boolean
  hrefAddLink?: string
  onRefreshButtonClick?: () => void
  onExportButtonClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  buttonLabel?: string
  addIcon?: React.ReactNode
}

const fontSize = {
  sm: {
    title: 'text-base',
    description: 'text-sm',
  },
  md: {
    title: 'text-xl',
    description: 'text-sm',
  },
  lg: {
    title: 'text-2xl',
    description: 'text-base',
  },
}

export const HeaderSection = (props: HeaderSectionProps) => {
  const {
    title,
    description,
    size = 'md',
    showDivider = true,
    showAddButton = true,
    showExportButton = true,
    showRefreshButton = false,
    hrefAddLink,
    onExportButtonClick,
    onRefreshButtonClick,
    disabledActions,
    children,
    buttonLabel,
    addIcon,
  } = props

  const fontSizeTitle = fontSize[size].title
  const fontSizeDescription = fontSize[size].description

  return (
    <main className="py-6 rounded-lg flex flex-col gap-5">
      <section className='flex flex-col gap-1'>
        <h2 className={`font-bold text-gray-800 ${fontSizeTitle}`}>
          {title || 'Título de la sección'}
        </h2>
        {description && (
          <h2 className={`text-gray-600 ${fontSizeDescription}`}>
            {description || 'Descripción de la sección'}
          </h2>
        )}
      </section>
      {showDivider && <hr className="border-gray-200" />}
      {!disabledActions && (
        <div className="flex gap-2 md:flex-row space-x-2 w-full overflow-x-auto xl:overflow-x-hidden">
          {showAddButton && (
            <Button
              variant="secondary"
              className="bg-default-100"
              asChild
            >
              <Link href={hrefAddLink || '#'}>
                {addIcon || <Plus className="mr-2 h-4 w-4" />}
                {buttonLabel || 'Agregar nuevo'}
              </Link>
            </Button>
          )}
          {showRefreshButton && (
            <Button
              variant="secondary"
              className="bg-default-100"
              onClick={onRefreshButtonClick}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Actualizar
            </Button>
          )}
          {showExportButton && (
            <Button
              variant="secondary"
              className="bg-default-100"
              onClick={onExportButtonClick}
            >
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
          )}
        </div>
      )}
      {children && <div className="mt-4">{children}</div>}
    </main>
  )
}
