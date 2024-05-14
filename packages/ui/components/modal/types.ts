export declare function ModalFn<C extends React.ElementType = 'div'>(props: ModalProps<C>): JSX.Element
export type ModalProps<C extends React.ElementType = 'div'> = React.ComponentProps<C> & {
  as?: C

  className?: string
  disableBackdropClick?: boolean
  hideBackdrop?: boolean
  hideCloseButton?: boolean
  onClose?: () => void
  show: boolean
  wrapperClassName?: string
}

export declare function ModalHeaderFn<C extends React.ElementType = 'div'>(props: ModalHeaderProps<C>): JSX.Element
export type ModalHeaderProps<C extends React.ElementType = 'div'> = React.ComponentProps<C> &
  React.PropsWithChildren<{
    as?: C
    onClose?: () => void
    className?: string
    subTitle?: React.ReactNode
  }>

export declare function ModalFooterFn<C extends React.ElementType = 'div'>(props: ModalFooterProps<C>): JSX.Element
export type ModalFooterProps<C extends React.ElementType = 'div'> = React.ComponentProps<C> & {
  as?: C
}
