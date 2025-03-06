'use client'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { ADMISSION_URLS_APP } from '@/config/urls-data/admission.urls.config'
import { cn } from '@/lib/utils'
import { AlertCircle, ArrowRight, CheckCircle2, Info, X } from 'lucide-react'
import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'

type StatusVariant = 'success' | 'warning' | 'danger'

interface StatusCardProps {
  variant: StatusVariant
  progress?: number
  className?: string
  closable?: boolean
}

const variantStyles = {
  success: {
    border: 'border-emerald-200',
    background: 'bg-emerald-50',
    progress: '[&>div]:bg-emerald-500',
    text: 'text-emerald-800',
    muted: 'text-emerald-600',
    button: 'bg-emerald-500 hover:bg-emerald-600',
    icon: CheckCircle2,
  },
  warning: {
    border: 'border-amber-200',
    background: 'bg-amber-50',
    progress: '[&>div]:bg-amber-500',
    text: 'text-amber-800',
    muted: 'text-amber-600',
    button: 'bg-amber-500 hover:bg-amber-600',
    icon: Info,
  },
  danger: {
    border: 'border-red-200',
    background: 'bg-red-50',
    progress: '[&>div]:bg-red-500',
    text: 'text-red-800',
    muted: 'text-red-600',
    button: 'bg-red-500 hover:bg-red-600',
    icon: AlertCircle,
  },
}

const variantContent = {
  success: {
    title: '¡Perfil completado!',
    description:
      'Tu perfil está completo, ya puedes postularte a los programas de tu interés.',
    buttonLabel: 'Actualizar perfil',
  },
  warning: {
    title: 'Perfil pendiente',
    description:
      'Tu perfil está casi completo, faltan algunos datos importantes.',
    buttonLabel: 'Continuar perfil',
  },
  danger: {
    title: 'Perfil incompleto',
    description:
      'Por favor completa tu perfil para acceder a todas las funcionalidades.',
    buttonLabel: 'Iniciar perfil',
  },
}

export const ProfileCompletion = ({
  variant,
  progress = 0,
  className,
  closable = true,
}: StatusCardProps) => {
  const [isVisible, setIsVisible] = useState(true)
  const styles = variantStyles[variant]
  const content = variantContent[variant]
  const Icon = styles.icon

  if (!isVisible) return null

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          exit={{ opacity: 0, height: 0, marginBottom: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card
            className={cn(
              'border shadow-sm relative',
              styles.border,
              styles.background,
              className
            )}
          >
            {closable && (
              <Button
                variant="ghost"
                size="icon"
                className={cn('absolute top-2 right-2', styles.text)}
                onClick={() => setIsVisible(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
            <CardHeader className="space-y-1">
              <CardTitle className="flex items-center gap-2 font-bold">
                <Icon
                  className={cn('w-5 h-5', styles.text)}
                  strokeWidth={3}
                />
                <span className={styles.text}>{content.title}</span>
              </CardTitle>
              <p className={cn('text-sm', styles.muted)}>
                {content.description}
              </p>
            </CardHeader>
            <CardContent className="space-y-2">
              <Progress
                value={progress}
                className={cn('h-2 bg-white', styles.progress)}
              />
              <p className={cn('text-sm font-medium', styles.text)}>
                {progress}% completado
              </p>
            </CardContent>
            <CardFooter>
              <div>
                <Button
                  asChild
                  className={cn('w-full text-white', styles.button)}
                >
                  <Link href={ADMISSION_URLS_APP.PROFILE.URL_BASE}>
                    {content.buttonLabel}{' '}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
