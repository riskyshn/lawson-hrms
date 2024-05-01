import LogoFull from '@/components/Logo/LogoFull'
import useLinks from '@/hooks/use-links'
import { hrisLinks, recruitmentLinks, rootLinks, settingsLinks } from '@/sidebar-links'
import { Sidebar as BaseSidebar, Button, SidebarContent, SidebarHeader, SidebarItem, useLayout } from 'jobseeker-ui'
import { PlusCircle, XIcon } from 'lucide-react'
import React from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { twJoin } from 'tailwind-merge'

const Sidebar: React.FC = () => {
  const { sidebarMini, toggleSidebarOpen } = useLayout()
  const links = useLinks([rootLinks, recruitmentLinks, hrisLinks, settingsLinks])
  const navigate = useNavigate()

  return (
    <BaseSidebar>
      <SidebarHeader wrapperClassName="justify-between">
        <Link className="block" to="/">
          <LogoFull height={40} />
        </Link>
        <Button onClick={() => toggleSidebarOpen()} type="button" variant="light">
          <XIcon className="block text-error-600" size={18} />
        </Button>
      </SidebarHeader>
      <SidebarContent className="chrome-scrollbar flex flex-col gap-3 py-3">
        <div className="px-3">
          <Button
            className="flex w-full items-center justify-center gap-0 overflow-hidden text-nowrap px-0"
            color="primary"
            onClick={() => navigate('/job/management/create')}
            rightChild={<PlusCircle className={twJoin(sidebarMini && 'lg:ml-0', 'ml-2')} size={16} />}
          >
            <span className={twJoin(sidebarMini && 'lg:hidden')}>Post a Job</span>
          </Button>
        </div>

        <div className="flex w-full flex-col gap-1">
          {links.map(({ items, title }, key) => (
            <div className="mb-2 flex w-full flex-col gap-1 px-3" key={key}>
              {!!title && <span className={twJoin(sidebarMini && 'lg:hidden', 'block px-2 text-xs text-gray-500')}>{title}</span>}
              <div className="flex w-full flex-col gap-2">
                {items.map(({ child, parent }, key) => (
                  <SidebarItem child={child} key={key} parent={parent} />
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
