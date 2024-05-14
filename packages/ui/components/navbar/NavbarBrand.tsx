import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const NavbarBrand = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <div ref={ref} className={twMerge('relative flex items-center gap-3 px-3 lg:w-64', className)} {...props} />
})

NavbarBrand.displayName = 'NavbarBrand'

export default NavbarBrand
