import React from 'react'
import { PlusCircle, XIcon } from 'lucide-react'
import { NavLink as Link } from 'react-router-dom'
import { Sidebar as BaseSidebar, Button, SidebarContent, SidebarHeader, SidebarLinks, useLayout } from 'jobseeker-ui'
import useLinks from './useLinks'
import LogoFull from '@/components/Logo/LogoFull'

const Sidebar: React.FC = () => {
  const { toggleSidebarOpen } = useLayout()
  const links = useLinks()

  return (
    <BaseSidebar>
      <SidebarHeader wrapperClassName="justify-between">
        <Link to="/" className="block">
          <LogoFull height={40} />
        </Link>
        <Button type="button" variant="light" onClick={() => toggleSidebarOpen()}>
          <XIcon size={18} className="block text-error-600" />
        </Button>
      </SidebarHeader>
      <SidebarContent className="chrome-scrollbar flex flex-col gap-3 py-3">
        <div className="px-1">
          <Button color="primary" leftChild={<PlusCircle size={16} />} className="gap-2">
            Post a Job
          </Button>
        </div>

        <SidebarLinks links={links} />

        <div className="mt-auto flex flex-col items-center justify-center p-3">
          <span className="block text-center text-xs text-gray-500">Powered by</span>
          <LogoFull height={32} />
        </div>
      </SidebarContent>
    </BaseSidebar>
  )
}

export default Sidebar
