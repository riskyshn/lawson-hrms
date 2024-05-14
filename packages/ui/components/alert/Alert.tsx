import type { AlertProps } from './types'
import { forwardRef, useState } from 'react'
import { XCircle } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import { variants } from '../../utils'

const Alert = forwardRef<HTMLDivElement, AlertProps>(({ title, color, hideable, className, children, ...props }, ref) => {
  const [show, setShow] = useState(true)
  if (!show) return null

  return (
    <div
      ref={ref}
      className={twMerge('relative rounded-lg border p-3 text-sm', hideable && 'pr-8', colorStyles(color), className)}
      {...props}
    >
      {!!title && <span className="block text-base font-semibold">{title}</span>}
      {children}
      {hideable && (
        <button type="button" className="absolute right-1 top-1" onClick={() => setShow(false)}>
          <XCircle size={24} strokeWidth={1} />
        </button>
      )}
    </div>
  )
})

const colorStyles = variants({
  default: 'text-secondary-800 bg-secondary-100 border-secondary-200',
  primary: 'text-primary-800 bg-primary-100 border-primary-200',
  success: 'text-success-800 bg-success-100 border-success-200',
  warning: 'text-warning-800 bg-warning-100 border-warning-200',
  error: 'text-error-800 bg-error-100 border-error-200',
})

Alert.displayName = 'Alert'

export default Alert
