import type { Color, Size } from '../../types'

export declare function BadgeFn<C extends React.ElementType = 'span'>(props: BadgeProps<C>): JSX.Element

export type BadgeProps<C extends React.ElementType = 'span'> = React.ComponentProps<C> & {
  as?: C
  size?: Size
  color?: Color
}
