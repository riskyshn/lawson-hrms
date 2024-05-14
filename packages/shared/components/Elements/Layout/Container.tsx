import { forwardRef } from 'react'
import { Outlet } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

export declare function ContainerFn<C extends React.ElementType = 'div'>(props: ContainerProps<C>): JSX.Element
export type ContainerProps<C extends React.ElementType = 'div'> = {
  as?: C
} & React.ComponentProps<C>

const Container = forwardRef<any, ContainerProps>(({ as: Component = 'div', children, className, ...props }, ref) => (
  <Component className={twMerge('mx-auto block w-full px-3 xl:px-8', className)} ref={ref} {...props}>
    {children || <Outlet />}
  </Component>
))

Container.displayName = 'Container'

export default Container as typeof ContainerFn
