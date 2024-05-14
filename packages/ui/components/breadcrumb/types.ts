export type BreadcrumbProps = React.HTMLAttributes<HTMLUListElement> & {
  wrapperClassName?: string
  actionsWrapperClassName?: string
  links: Array<BreadcrumbLinkProps>
  actions?: React.ReactNode
  separator?: React.ElementType
}

export declare function BreadcrumbLinkFn<C extends React.ElementType = 'span'>(props: BreadcrumbLinkProps<C>): JSX.Element

export type BreadcrumbLinkProps<C extends React.ElementType = 'span'> = React.ComponentProps<C> & {
  as?: C
  text: string
  active?: boolean
  hoverable?: boolean
}
