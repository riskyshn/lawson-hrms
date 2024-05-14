import type { ModalFn, ModalProps } from './types'
import { forwardRef, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

const Modal = forwardRef<any, ModalProps>(
  ({ className, disableBackdropClick, hideBackdrop, hideCloseButton, onClose, show, wrapperClassName, children, ...rest }, ref) => {
    return (
      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-[99]" onClose={() => !disableBackdropClick && onClose?.()}>
          {!hideBackdrop && (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black/25" />
            </Transition.Child>
          )}

          {!hideCloseButton && onClose && (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <button className="fixed right-3 top-3 z-[999] text-error-600 hover:text-error-700 focus:outline-none" onClick={onClose}>
                <XCircleIcon size={32} fill="white" />
              </button>
            </Transition.Child>
          )}

          <div className="fixed inset-0 overflow-y-auto">
            <div className={twMerge('flex min-h-full items-center justify-center p-4 text-center', wrapperClassName)}>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  ref={ref as any}
                  className={twMerge(
                    'relative w-full max-w-2xl divide-y rounded-lg bg-white text-left shadow-xl transition-all',
                    className,
                  )}
                  {...rest}
                >
                  {children}
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    )
  },
)

Modal.displayName = 'Modal'

export default Modal as typeof ModalFn
