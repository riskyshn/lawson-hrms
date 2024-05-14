import type { SidebarHeaderProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const SidebarHeader = forwardRef<HTMLDivElement, SidebarHeaderProps>(({ wrapperClassName, className, children, ...props }, ref) => {
  return (
    <div ref={ref} className={twMerge('w-full border-b px-3 lg:hidden', className)} {...props}>
      <div className={twMerge('relative flex h-16 items-center', wrapperClassName)}>{children}</div>
    </div>
  )
})

SidebarHeader.displayName = 'SidebarHeader'

export default SidebarHeader
