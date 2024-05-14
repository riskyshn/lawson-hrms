import type { PaginationItemFn, PaginationItemProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const PaginationItem = forwardRef<any, PaginationItemProps>((props, ref) => {
  const { as: Component = 'a', active, disabled, className, ...rest } = props

  return (
    <li>
      <Component
        ref={ref}
        className={twMerge(
          active && 'active bg-primary-600 text-white',
          disabled && 'disabled text-gray-500',
          'flex h-9 min-w-9 items-center justify-center rounded-lg px-2 transition-colors hover:[&:not(.disabled)]:[&:not(.active)]:bg-primary-50 hover:[&:not(.disabled)]:[&:not(.active)]:text-primary-600',
          className,
        )}
        {...rest}
      />
    </li>
  )
})

PaginationItem.displayName = 'PaginationItem'

export default PaginationItem as typeof PaginationItemFn
