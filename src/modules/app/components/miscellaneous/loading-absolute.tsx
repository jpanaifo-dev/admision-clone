import { Spinner } from '@nextui-org/react'

interface LoadingAbsoluteProps {
  show?: boolean
}

export const LoadingAbsolute = ({ show }: LoadingAbsoluteProps) => {
  if (!show) return null
  return (
    <div className="absolute inset-0 flex items-center justify-center z-50 bg-background/30 backdrop-blur-sm">
      <Spinner
        classNames={{ label: 'text-foreground mt-4' }}
        label="Loading..."
        // variant="simple"
      />
    </div>
  )
}
