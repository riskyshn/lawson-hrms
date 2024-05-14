export type PaginationProps = React.HTMLAttributes<HTMLUListElement>

export declare function PaginationItemFn<C extends React.ElementType = 'a'>(props: PaginationItemProps<C>): JSX.Element
export type PaginationItemProps<C extends React.ElementType = 'a'> = React.ComponentProps<C> & {
  as?: C
  active?: boolean
  disabled?: boolean
}
