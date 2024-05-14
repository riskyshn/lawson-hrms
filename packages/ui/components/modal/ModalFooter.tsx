import type { ModalFooterFn, ModalFooterProps } from './types'
import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

const ModalFooter = forwardRef<any, ModalFooterProps>(({ as: Component = 'div', className, ...rest }, ref) => {
  return <Component ref={ref} className={twMerge('flex justify-end gap-3 p-3', className)} {...rest} />
})

ModalFooter.displayName = 'ModalFooter'

export default ModalFooter as typeof ModalFooterFn
