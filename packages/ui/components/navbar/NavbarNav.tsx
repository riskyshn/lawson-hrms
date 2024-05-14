import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const NavbarNav = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => {
  return <nav ref={ref} className={twMerge('flex h-16 flex-1 items-center gap-3 px-3', className)} {...props} />
})

NavbarNav.displayName = 'NavbarNav'

export default NavbarNav
