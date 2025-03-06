import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

interface AlertDialogCustomProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  handleConfirm?: () => void
  handleCancel?: () => void
  labelCancel?: string
}

export const AlertDialogCustom = (props: AlertDialogCustomProps) => {
  const {
    title,
    open,
    onOpenChange,
    description,
    handleCancel,
    handleConfirm,
    labelCancel,
  } = props

  return (
    <AlertDialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title || 'Are you absolutely sure?'}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description ||
              'This action cannot be undone. This will permanently delete your account and remove your data from our servers.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel}>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            {labelCancel || 'Continuar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
