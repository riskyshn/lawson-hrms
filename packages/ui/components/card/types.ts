import { Color } from '../../types'

export declare function CardFn<C extends React.ElementType = 'div'>(props: CardProps<C>): JSX.Element
export type CardProps<C extends React.ElementType = 'div'> = React.ComponentProps<C> & {
  as?: C
  className?: string
  children?: React.ReactNode
  hoverable?: Color | true
}

export declare function CardHeaderFn<C extends React.ElementType = 'div'>(props: CardHeaderProps<C>): JSX.Element
export type CardHeaderProps<C extends React.ElementType = 'div'> = React.ComponentProps<C> & {
  as?: C
  titleAs?: React.ElementType
  actions?: React.ReactNode
  actionsWrapperClassName?: string
  titleClassName?: string
}

export declare function CardBodyFn<C extends React.ElementType = 'div'>(props: CardBodyProps<C>): JSX.Element
export type CardBodyProps<C extends React.ElementType = 'div'> = React.ComponentProps<C> & {
  as?: C
}

export declare function CardFooterFn<C extends React.ElementType = 'div'>(props: CardFooterProps<C>): JSX.Element
export type CardFooterProps<C extends React.ElementType = 'div'> = React.ComponentProps<C> & {
  as?: C
}
