import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const Navbar = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <header ref={ref} className={twMerge('fixed left-0 right-0 top-0 z-50 flex border-b bg-white', className)} {...props} />
})

Navbar.displayName = 'Navbar'

export default Navbar
