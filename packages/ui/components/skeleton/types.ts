export declare function SkeletonFn<C extends React.ElementType = 'span'>(props: SkeletonProps<C>): JSX.Element

export type SkeletonProps<C extends React.ElementType = 'span'> = Omit<React.ComponentProps<C>, 'children'> & {
  as?: C
  count?: number
}
