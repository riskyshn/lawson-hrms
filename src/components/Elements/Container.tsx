import { forwardRef } from 'react'
import { Outlet } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export declare function ContainerFn<C extends React.ElementType = 'div'>(props: ContainerProps<C>): JSX.Element
export type ContainerProps<C extends React.ElementType = 'div'> = React.ComponentProps<C> & {
  as?: C
}

const Container = forwardRef<any, ContainerProps>(({ as: Component = 'div', className, children, ...props }, ref) => (
  <Component ref={ref} className={twMerge('mx-auto block w-full px-3 xl:px-8', className)} {...props}>
    {children || <Outlet />}
  </Component>
))

export default Container as typeof ContainerFn
