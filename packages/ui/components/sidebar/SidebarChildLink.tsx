import type { SidebarChildLinkFn, SidebarChildLinkProps } from './types'
import { forwardRef } from 'react'
import { Circle } from 'lucide-react'
import { twJoin, twMerge } from 'tailwind-merge'
import { useLayout } from '../../contexts'
import Badge from '../badge/Badge'

const SidebarChildLink = forwardRef<HTMLAnchorElement, SidebarChildLinkProps>((props, ref) => {
  const { as: Component = 'a', text, badge, active, className, ...rest } = props
  const { sidebarMini, sidebarActive } = useLayout()
  return (
    <Component
      ref={ref}
      title={text}
      className={twMerge(
        active ? 'bg-secondary-100 text-secondary-700' : 'text-secondary-500 hover:bg-secondary-50',
        'flex cursor-pointer items-center justify-between rounded-lg p-2 text-sm transition-colors',
        className,
      )}
      {...rest}
    >
      <span className={twJoin('flex flex-1 items-center gap-2', sidebarMini && !sidebarActive && 'lg:justify-center')}>
        <span className="flex h-5 w-5 items-center justify-center">
          <Circle size={10} className={twJoin(active && 'fill-current')} />
        </span>

        <span className={twJoin(sidebarMini && !sidebarActive && 'lg:hidden', 'block')}>{text}</span>

        {badge?.show && (
          <Badge color={badge.color} size="small" className={twJoin(sidebarMini && !sidebarActive && 'lg:hidden')}>
            {badge.text}
          </Badge>
        )}
      </span>
    </Component>
  )
})

SidebarChildLink.displayName = 'SidebarChildLink'

export default SidebarChildLink as typeof SidebarChildLinkFn
