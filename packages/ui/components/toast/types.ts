export type ToastPosition = 'top-left' | 'top-right' | 'top-center' | 'bottom-left' | 'bottom-right' | 'bottom-center'
export type ToastColor = 'primary' | 'success' | 'warning' | 'error'

export type ToastProps = {
  color?: ToastColor
  handleClose?: () => void
  children?: React.ReactNode
}
