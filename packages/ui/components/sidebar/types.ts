import type { Color } from '../../types'

export type SidebarHeaderProps = React.HTMLAttributes<HTMLDivElement> &
  React.PropsWithChildren & {
    wrapperClassName?: string
  }

export declare function SidebarChildLinkFn<C extends React.ElementType = 'a'>(props: SidebarChildLinkProps<C>): JSX.Element
export type SidebarChildLinkProps<C extends React.ElementType = 'a'> = React.ComponentProps<C> & {
  as?: React.ElementType

  text: string
  active?: boolean
  badge?: {
    show: boolean
    color?: Color
    text?: string
  }

  onClick?: React.MouseEventHandler
}

export declare function SidebarParentLinkFn<C extends React.ElementType = 'a'>(props: SidebarParentLinkProps<C>): JSX.Element
export type SidebarParentLinkProps<C extends React.ElementType = 'a'> = React.ComponentProps<C> & {
  as?: React.ElementType

  icon: React.ComponentType<any>
  text: string
  active?: boolean
  open?: boolean
  haveChild?: boolean
  badge?: {
    show: boolean
    color?: Color
    text?: string
  }

  onClick?: React.MouseEventHandler
}

export type SidebarItemProps<C extends React.ElementType = 'a'> = {
  parent: SidebarParentLinkProps<C>
  child?: Array<SidebarChildLinkProps<C>>
}
