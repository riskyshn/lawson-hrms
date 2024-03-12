import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from 'lucide-react'
import React, { Fragment } from 'react'
import { twMerge } from 'tailwind-merge'

type PropTypes = React.PropsWithChildren<{
  show: boolean
  onClose: () => void
  className?: string
  hideCloseToggle?: boolean
}>

const MainModal: React.FC<PropTypes> = ({ show, onClose, className, children, hideCloseToggle }) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-[50]" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
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
                {!hideCloseToggle && (
                  <button
                    className="absolute -right-3 -top-3 z-50 text-error-600 hover:text-error-700 focus:outline-none"
                    onClick={onClose}
                  >
                    <XCircleIcon size={32} fill="white" />
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
