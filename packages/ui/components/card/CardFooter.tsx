import type { CardFooterFn, CardFooterProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const CardFooter = forwardRef<any, CardFooterProps>(({ as: Component = 'div', className, ...rest }, ref) => {
  return <Component ref={ref} className={twMerge('flex justify-end gap-3 p-3', className)} {...rest} />
})

CardFooter.displayName = 'CardFooter'

export default CardFooter as typeof CardFooterFn
