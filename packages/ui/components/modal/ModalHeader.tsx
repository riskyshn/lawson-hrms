import type { ModalHeaderFn, ModalHeaderProps } from './types'
import { forwardRef } from 'react'
import { XIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { Button } from '../button'

const ModalHeader = forwardRef<any, ModalHeaderProps>(({ as: Component = 'div', subTitle, children, className, onClose, ...rest }, ref) => {
  return (
    <Component
      ref={ref}
      className={twMerge('flex items-center justify-between p-3', !onClose && 'justify-center py-6 text-center', className)}
      {...rest}
    >
      <div className="flex min-h-12 flex-col justify-center leading-none">
        <h3 className="text-lg font-semibold">{children}</h3>
        {subTitle && <span className="block text-sm">{subTitle}</span>}
      </div>
      {onClose && (
        <Button title="Close modal" type="button" iconOnly color="error" variant="light" onClick={onClose}>
          <XIcon size={18} />
        </Button>
      )}
    </Component>
  )
})

ModalHeader.displayName = 'ModalHeader'

export default ModalHeader as typeof ModalHeaderFn
