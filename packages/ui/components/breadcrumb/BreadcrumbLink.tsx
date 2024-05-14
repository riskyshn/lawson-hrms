import type { BreadcrumbLinkFn, BreadcrumbLinkProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const BreadcrumbLink = forwardRef<any, BreadcrumbLinkProps>((props, ref) => {
  const { as: Component = 'span', text, active, hoverable, className, ...rest } = props

  return (
    <Component
      ref={ref}
      className={twMerge(
        hoverable && 'hoverable',
        active && 'active',
        'text-gray-500 [&.active]:text-primary-600 [&.hoverable]:cursor-pointer hover:[&.hoverable]:text-primary-600',
        className,
      )}
      {...rest}
    >
      {text}
    </Component>
  )
})

BreadcrumbLink.displayName = 'BreadcrumbLink'

export default BreadcrumbLink as typeof BreadcrumbLinkFn
