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
import { cn } from '@/lib/utils'

interface ConfirmationModalProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  handleConfirm?: () => void
  handleCancel?: () => void
  labelCancel?: string
  labelConfirm?: string
  isDanger?: boolean
}

export const ConfirmationModal = (props: ConfirmationModalProps) => {
  const {
    title,
    open,
    onOpenChange,
    description,
    handleCancel,
    handleConfirm,
    labelCancel,
    labelConfirm,
    isDanger,
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
          <AlertDialogCancel onClick={handleCancel}>
            {labelCancel || 'Cancelar'}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className={cn(
              isDanger && 'text-white bg-danger-500 hover:bg-danger-600'
            )}
          >
            {labelConfirm || 'Continuar'}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
