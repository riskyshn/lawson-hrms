import type { SidebarItemProps } from './types'
import { useState } from 'react'
import { useLayout } from '../../contexts'
import SidebarChildLink from './SidebarChildLink'
import SidebarParentLink from './SidebarParentLink'

const SidebarItem: React.FC<SidebarItemProps> = ({ parent, child }) => {
  const [open, setOpen] = useState(!!parent.active)
  const { sidebarActive, sidebarMini } = useLayout()

  const handleParentClick: React.MouseEventHandler = (e) => {
    setOpen((v) => !v)
    if (child?.length) {
      e.preventDefault()
    }
    parent.onClick?.(e)
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <SidebarParentLink haveChild={!!child?.length} open={open} {...parent} onClick={handleParentClick} />

      {child && open && ((sidebarMini && sidebarActive) || !sidebarMini) && (
        <div className="flex w-full flex-col gap-1">
          {child.map((item, index) => (
            <SidebarChildLink key={index} {...item} />
          ))}
        </div>
      )}
    </div>
  )
}

export default SidebarItem
