import React, { memo, useMemo } from 'react'
import { NavLink as Link, useNavigate } from 'react-router-dom'
import { Sidebar as BaseSidebar, Button, SidebarContent, SidebarHeader, SidebarItem, useLayout } from 'jobseeker-ui'
import { PlusCircle, XIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { LogoFull } from '@/components'
import { useHasPermission } from '@/contexts'
import { useLinks } from '@/hooks'
import { hrisLinks, recruitmentLinks, rootLinks, settingsLinks } from '@/sidebar-links'

const Sidebar: React.FC = () => {
  const { sidebarMini, sidebarActive, toggleSidebarOpen } = useLayout()
  const allLinks = useLinks(rootLinks, recruitmentLinks, hrisLinks, settingsLinks)
  const navigate = useNavigate()

  const hasPermission = useHasPermission()

  const filteredLinks = useMemo(
    () =>
      allLinks.map((link) => ({
        ...link,
        items: link.items
          .map((el) => {
            const filteredChild = el.child?.filter((child) => hasPermission(child.permission))
            return hasPermission(el.parent.permission) && filteredChild?.length ? { ...el, child: filteredChild } : null
          })
          .filter(Boolean),
      })),
    [allLinks, hasPermission],
  )

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
            className="flex w-full items-center justify-center gap-0 overflow-hidden truncate text-nowrap px-0"
            color="primary"
            onClick={() => navigate('/job/management/create')}
            rightChild={<PlusCircle className={twJoin(sidebarMini && !sidebarActive && 'lg:ml-0', 'ml-2')} size={16} />}
          >
            <span className={twJoin(sidebarMini && !sidebarActive && 'lg:hidden')}>Post a Job</span>
          </Button>
        </div>

        <div className="flex w-full flex-col gap-1">
          {filteredLinks.map(({ items, title }, key) => (
            <div className="mb-2 flex w-full flex-col gap-1 px-3" key={key}>
              {!!title && (
                <span className={twJoin(sidebarMini && !sidebarActive && 'lg:hidden', 'block px-2 text-xs text-gray-500 last:hidden')}>
                  {title}
                </span>
              )}
              {items.length > 0 && (
                <div className="flex w-full flex-col gap-2">
                  {items.map((el, key) => (
                    <React.Fragment key={key}>{el?.parent && <SidebarItem child={el?.child} parent={el?.parent} />}</React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className={twJoin(sidebarMini && !sidebarActive && 'lg:hidden', 'mt-auto flex flex-col items-center justify-center p-3')}>
          <span className="block text-center text-xs text-gray-500">Powered by</span>
          <LogoFull height={32} />
        </div>
      </SidebarContent>
    </BaseSidebar>
  )
}

export default memo(Sidebar)
