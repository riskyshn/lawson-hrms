import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from 'lucide-react'
import React, { Fragment } from 'react'

type FullScreenModalProps = {
  show: boolean
  children?: React.ReactNode
  onClose: () => void
}

const FullScreenModal: React.FC<FullScreenModalProps> = ({ show, children, onClose }) => {
  return (
    <Transition appear show={show} as={Fragment}>
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
          <div className="fixed inset-0 bg-black/25 backdrop-blur" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <button className="absolute right-3 top-3 z-[999] text-error-600 hover:text-error-700 focus:outline-none" onClick={onClose}>
              <XCircleIcon size={32} fill="white" />
            </button>
          </Transition.Child>
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative h-screen w-screen rounded-lg text-left shadow-xl transition-all">{children}</Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default FullScreenModal
