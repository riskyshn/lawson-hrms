import type { CardBodyFn, CardBodyProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const CardBody = forwardRef<any, CardBodyProps>(({ as: Component = 'div', className, ...rest }, ref) => {
  return <Component ref={ref} className={twMerge('block p-3', className)} {...rest} />
})

CardBody.displayName = 'CardBody'

export default CardBody as typeof CardBodyFn
