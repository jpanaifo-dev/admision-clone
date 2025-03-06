import { CircleCheck, CircleX, Info, TriangleAlert } from 'lucide-react'

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface IAlertMenssageProps {
  title: string
  children: React.ReactNode
  variant?: 'info' | 'success' | 'warning' | 'error'
}

const variants = {
  info: 'bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-800 dark:text-blue-100 dark:border-blue-800',
  success:
    'bg-green-50 text-green-800 border-green-200 dark:bg-green-800 dark:text-green-100 dark:border-green-800',
  warning:
    'bg-yellow-50 text-yellow-800 border-yellow-200 dark:bg-yellow-800 dark:text-yellow-100 dark:border-yellow-800',
  error:
    'bg-red-50 text-red-800 border-red-200 dark:bg-red-800 dark:text-red-100 dark:border-red-800',
}

const icon = {
  info: <Info className="h-4 w-4" />,
  success: (
    <CircleCheck className="h-4 w-4 text-green-500 dark:text-green-300" />
  ),
  warning: <TriangleAlert className="h-4 w-4" />,
  error: <CircleX className="h-4 w-4" />,
}

export function AlertMenssage(props: IAlertMenssageProps) {
  const { title, children, variant = 'info' } = props

  const variantStyle = variants[variant]
  const iconSelected = icon[variant]

  return (
    <Alert className={`${variantStyle}`}>
      {iconSelected}
      <AlertTitle className="font-bold">{title}</AlertTitle>
      <AlertDescription className="text-sm">{children}</AlertDescription>
    </Alert>
  )
}
