export const buttonLabels = {
  labelSubmit: {
    next: 'Siguiente',
    finish: 'Terminar y guardar',
    save: 'Guardar',
    add: 'Agregar',
  },
  labelCancel: {
    back: 'Atrás',
    cancel: 'Cancelar',
  },
}

export const ActionsTypes = {
  FORGOT_PASSWORD: 'forgot-password',
  SIGN_UP: 'sign-up',
  VERIFY_EMAIL: 'verify-email',
}

export type IActionsTypes =
  | 'forgot-password'
  | 'sign-up'
  | 'verify-email'
  | 'payment-validate'

export const statusLabels = [
  { label: 'Activo', value: 'activo' },
  { label: 'Inactivo', value: 'inactivo' },
]
