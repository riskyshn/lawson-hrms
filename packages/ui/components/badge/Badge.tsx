import type { BadgeFn, BadgeProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { variants } from '../../utils'

const Badge = forwardRef<any, BadgeProps>((props, ref) => {
  const { as: Component = 'span', size, color, className, children, ...rest } = props

  return (
    <Component ref={ref} className={twMerge(sizeStyles(size), colorStyles(color), 'inline-block rounded', className)} {...rest}>
      {children}
    </Component>
  )
})

const colorStyles = variants({
  default: 'text-secondary-800 bg-secondary-100',
  primary: 'text-primary-800 bg-primary-100',
  success: 'text-success-800 bg-success-100',
  warning: 'text-warning-800 bg-warning-100',
  error: 'text-error-800 bg-error-100',
})

const sizeStyles = variants({
  default: 'px-2 py-0.5 text-sm',
  small: 'px-1 py-0.5 text-xs',
  large: 'px-3 py-1',
})

Badge.displayName = 'Badge'

export default Badge as typeof BadgeFn
