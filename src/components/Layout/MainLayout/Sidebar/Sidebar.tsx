import React from 'react'
import { PlusCircle, XIcon } from 'lucide-react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { Sidebar as BaseSidebar, Button, SidebarContent, SidebarHeader, SidebarItem, useLayout } from 'jobseeker-ui'
import useLinks from './useLinks'
import LogoFull from '@/components/Logo/LogoFull'

const Sidebar: React.FC = () => {
  const { toggleSidebarOpen } = useLayout()
  const links = useLinks()
  const navigate = useNavigate()

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
        <div className="px-3">
          <Button
            onClick={() => navigate('/job/management/create')}
            color="primary"
            block
            leftChild={<PlusCircle size={16} />}
            className="gap-2"
          >
            Post a Job
          </Button>
        </div>

        <div className="flex w-full flex-col gap-1">
          {links.map(({ items, title }, key) => (
            <div key={key} className="mb-2 flex w-full flex-col gap-1 px-3">
              {!!title && <span className="block text-xs text-gray-500">{title}</span>}
              <div className="flex w-full flex-col gap-2">
                {items.map(({ parent, child }, key) => (
                  <SidebarItem key={key} parent={parent} child={child} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-auto flex flex-col items-center justify-center p-3">
          <span className="block text-center text-xs text-gray-500">Powered by</span>
          <LogoFull height={32} />
        </div>
      </SidebarContent>
    </BaseSidebar>
  )
}

export default Sidebar
