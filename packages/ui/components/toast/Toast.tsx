import type { ToastProps } from './types'
import { forwardRef, useEffect, useState } from 'react'
import { Transition } from '@headlessui/react'
import { AlertTriangle, CheckCircle, Info, XCircle, XIcon } from 'lucide-react'
import { twJoin } from 'tailwind-merge'
import { variants } from '../../utils'

const Toast = forwardRef<HTMLDivElement, ToastProps>(({ color, handleClose, children }, ref) => {
  const Tag = IconElements(color || 'primary')
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(true)
  }, [])

  return (
    <Transition show={show} enter="transition-opacity" enterFrom="opacity-0" enterTo="opacity-100">
      <div ref={ref} className="flex w-72 rounded-lg border border-gray-100 bg-white p-3 shadow-xl">
        <Tag className={twJoin(colorStyles(color || 'primary'), 'my-auto block')} size={24} />
        <span className="my-auto block flex-1 overflow-hidden pl-3 text-sm">{children}</span>
        <button
          type="button"
          className="mb-auto flex h-6 w-6 items-center justify-center rounded-full text-red-600 transition-colors hover:bg-red-50"
          onClick={handleClose}
        >
          <XIcon size={16} />
        </button>
      </div>
    </Transition>
  )
})

const colorStyles = variants({
  primary: 'text-primary-600',
  success: 'text-success-600',
  warning: 'text-warning-600',
  error: 'text-error-600',
})

const IconElements = variants({
  primary: Info,
  success: CheckCircle,
  warning: AlertTriangle,
  error: XCircle,
})

Toast.displayName = 'Toast'

export default Toast
