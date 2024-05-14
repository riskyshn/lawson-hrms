import type { CardFn, CardProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { variants } from '../../utils'

const Card = forwardRef<any, CardProps>(({ as: Component = 'div', hoverable, className, ...rest }, ref) => {
  const color = typeof hoverable === 'string' ? hoverable : 'default'
  return (
    <Component
      ref={ref}
      className={twMerge(
        'block divide-y rounded-lg border bg-white transition-colors [&>*]:transition-colors',
        !!hoverable && colorStyles(color),
        className,
      )}
      {...rest}
    />
  )
})

const colorStyles = variants({
  default:
    'border-secondary-200 divide-secondary-200 bg-secondary-100 hover:bg-secondary-200 hover:border-secondary-300 hover:divide-secondary-300',
  primary: 'border-primary-200 divide-primary-200 bg-primary-100 hover:bg-primary-200 hover:border-primary-300 hover:divide-primary-300',
  success: 'border-success-200 divide-success-200 bg-success-100 hover:bg-success-200 hover:border-success-300 hover:divide-success-300',
  warning: 'border-warning-200 divide-warning-200 bg-warning-100 hover:bg-warning-200 hover:border-warning-300 hover:divide-warning-300',
  error: 'border-error-200 divide-error-200 bg-error-100 hover:bg-error-200 hover:border-error-300 hover:divide-error-300',
})

Card.displayName = 'Card'

export default Card as typeof CardFn
