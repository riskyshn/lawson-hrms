import React from 'react'
import { Outlet } from 'react-router-dom'
import { useLayout } from 'jobseeker-ui'
import { twJoin } from 'tailwind-merge'

const ErrorLayout: React.FC = () => {
  const { sidebarMini } = useLayout()
  return (
    <>
      <main className={twJoin(sidebarMini ? 'lg:pl-16' : 'lg:pl-64', 'min-h-screen pt-16 transition-[padding]')}>
        <Outlet />
      </main>
    </>
  )
}

export default ErrorLayout
