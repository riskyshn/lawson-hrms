import { Color, Size, Variant } from '../../types'

export declare function ButtonFn<C extends React.ElementType = 'button'>(props: ButtonProps<C>): JSX.Element

export type ButtonProps<C extends React.ElementType = 'button'> = React.ComponentProps<C> & {
  as?: C

  size?: Size
  color?: Color
  variant?: Variant
  block?: boolean
  iconOnly?: boolean
  leftChild?: React.ReactNode
  rightChild?: React.ReactNode

  disabled?: boolean
  loading?: boolean
}
