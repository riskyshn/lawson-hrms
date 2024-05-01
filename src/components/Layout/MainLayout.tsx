import { useLayout } from 'jobseeker-ui'
import { Outlet } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'

import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'

export const Component: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const { sidebarMini } = useLayout()
  return (
    <>
      <Navbar />
      <Sidebar />

      <main className={twJoin(sidebarMini ? 'lg:pl-16' : 'lg:pl-64', 'min-h-screen pt-16 transition-[padding]')}>
        {children ? children : <Outlet />}
      </main>
    </>
  )
}

Component.displayName = 'MainLayout'

export default Component
