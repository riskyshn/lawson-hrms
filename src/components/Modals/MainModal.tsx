import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

type PropTypes = React.PropsWithChildren<{
  className?: string
  closeToggleInOutside?: boolean
  hideCloseToggle?: boolean
  onClose?: () => void
  show: boolean
}>

const MainModal: React.FC<PropTypes> = ({ children, className, closeToggleInOutside, hideCloseToggle, onClose, show }) => {
  return (
    <Transition appear as={Fragment} show={show}>
      <Dialog as="div" className="relative z-[50]" onClose={() => onClose?.()}>
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

        <div className="fixed inset-0 overflow-y-auto">
          {!hideCloseToggle && closeToggleInOutside && onClose && (
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <button className="text-error-600 hover:text-error-700 absolute right-3 top-3 z-[999] focus:outline-none" onClick={onClose}>
                <XCircleIcon fill="white" size={32} />
              </button>
            </Transition.Child>
          )}
          <div className="flex min-h-full items-center justify-center p-4 text-center">
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
                className={twMerge('relative w-full max-w-2xl rounded-lg bg-white p-6 text-left shadow-xl transition-all', className)}
              >
                {!hideCloseToggle && !closeToggleInOutside && onClose && (
                  <button
                    className="text-error-600 hover:text-error-700 absolute -right-3 -top-3 z-50 focus:outline-none"
                    onClick={onClose}
                  >
                    <XCircleIcon fill="white" size={32} />
                  </button>
                )}
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default MainModal
