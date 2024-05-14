import type { BreadcrumbProps } from './types'
import { forwardRef } from 'react'
import { ChevronRight } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import BreadcrumbLink from './BreadcrumbLink'

const Breadcrumb = forwardRef<HTMLDivElement, BreadcrumbProps>(
  ({ separator: Separator = ChevronRight, className, wrapperClassName, actions, actionsWrapperClassName, links, ...props }, ref) => {
    return (
      <nav ref={ref} className={twMerge('flex items-center justify-between', className)}>
        <ul className={twMerge('flex gap-3', wrapperClassName)} {...props}>
          {links.map((link, i) => {
            return (
              <ol key={i} className="flex items-center justify-center gap-2 text-sm">
                <BreadcrumbLink {...link} />
                {i < links.length - 1 && <Separator className="block h-4 w-4 text-gray-400" />}
              </ol>
            )
          })}
        </ul>
        {!!actions && <div className={actionsWrapperClassName}>{actions}</div>}
      </nav>
    )
  },
)

Breadcrumb.displayName = 'Breadcrumb'

export default Breadcrumb
