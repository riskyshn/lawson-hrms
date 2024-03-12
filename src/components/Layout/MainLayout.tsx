import { useLayout } from 'jobseeker-ui'
import { Outlet } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'
import Navbar from './Navbar/Navbar'
import Sidebar from './Sidebar/Sidebar'

const MainLayout: React.FC = () => {
  const { sidebarMini } = useLayout()
  return (
    <>
      <Navbar />
      <Sidebar />

      <main className={twJoin(sidebarMini ? 'lg:pl-16' : 'lg:pl-64', 'min-h-screen pt-16 transition-[padding]')}>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
