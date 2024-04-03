import React from 'react'
import { PlusCircle, XIcon } from 'lucide-react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { Sidebar as BaseSidebar, Button, SidebarContent, SidebarHeader, SidebarItem, useLayout } from 'jobseeker-ui'
import LogoFull from '@/components/Logo/LogoFull'
import { twJoin } from 'tailwind-merge'
import useLinks from '@/hooks/use-links'
import { rootLinks, recruitmentLinks, hrisLinks, settingsLinks, cmsLinks } from '@/sidebar-links'

const Sidebar: React.FC = () => {
  const { sidebarMini, toggleSidebarOpen } = useLayout()
  const links = useLinks([rootLinks, recruitmentLinks, hrisLinks, settingsLinks, cmsLinks])
  const navigate = useNavigate()

  return (
    <BaseSidebar className="bg-white/80 backdrop-blur">
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
            rightChild={<PlusCircle size={16} className={twJoin(sidebarMini && 'lg:ml-0', 'ml-2')} />}
            className="flex w-full items-center justify-center gap-0 overflow-hidden text-nowrap px-0"
          >
            <span className={twJoin(sidebarMini && 'lg:hidden')}>Post a Job</span>
          </Button>
        </div>

        <div className="flex w-full flex-col gap-1">
          {links.map(({ items, title }, key) => (
            <div key={key} className="mb-2 flex w-full flex-col gap-1 px-3">
              {!!title && <span className={twJoin(sidebarMini && 'lg:hidden', 'block px-2 text-xs text-gray-500')}>{title}</span>}
              <div className="flex w-full flex-col gap-2">
                {items.map(({ parent, child }, key) => (
                  <SidebarItem key={key} parent={parent} child={child} />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className={twJoin(sidebarMini && 'lg:hidden', 'mt-auto flex flex-col items-center justify-center p-3')}>
          <span className="block text-center text-xs text-gray-500">Powered by</span>
          <LogoFull height={32} />
        </div>
      </SidebarContent>
    </BaseSidebar>
  )
}

export default Sidebar
