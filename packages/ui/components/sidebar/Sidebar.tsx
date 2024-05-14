import React, { forwardRef } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { useLayout } from '../../contexts'

const Sidebar = forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLElement>>(({ className, children, ...props }, ref) => {
  const { sidebarOpen, sidebarMini, sidebarActive, toggleSidebarOpen, toggleSidebarActive } = useLayout()

  return (
    <>
      <span
        className={twJoin(
          sidebarOpen ? 'pointer-events-auto opacity-30' : 'pointer-events-none opacity-0',
          'fixed bottom-0 left-0 right-0 top-0 z-[59] bg-white dark:bg-black lg:hidden',
        )}
        onClick={() => toggleSidebarOpen(false)}
      />

      <aside
        ref={ref}
        className={twMerge(
          sidebarMini && !sidebarActive && 'lg:w-16',
          !sidebarOpen && '-translate-x-full lg:-translate-x-0',
          'fixed bottom-0 left-0 top-0 z-[60] flex w-64 flex-col border-r bg-white transition-transform lg:z-40 lg:pt-16 lg:shadow-none lg:transition-[width]',
          className,
        )}
        onMouseEnter={() => toggleSidebarActive(true)}
        onMouseLeave={() => toggleSidebarActive(false)}
        {...props}
      >
        {children}
      </aside>
    </>
  )
})

Sidebar.displayName = 'Sidebar'

export default Sidebar
