import { forwardRef, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { twMerge } from 'tailwind-merge'

type PropTypes = {
  children?: React.ReactNode
  className?: string
  onClose?: () => void
  show?: boolean
}

const SideModal = forwardRef<HTMLDivElement, PropTypes>(({ children, className, onClose, show }, ref) => {
  return (
    <Transition as={Fragment} show={!!show}>
      <Dialog as="div" className="relative z-50" onClose={() => onClose?.()} ref={ref}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-200"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/25" />
        </Transition.Child>

        <div className="fixed inset-0 flex h-full justify-end">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-200"
            enterFrom="-right-full"
            enterTo="right-0"
            leave="ease-in-out duration-200"
            leaveFrom="right-0"
            leaveTo="-right-full"
          >
            <Dialog.Panel
              className={twMerge(
                'relative flex h-full w-full max-w-5xl transform flex-col overflow-hidden bg-gray-200 shadow-xl transition-all',
                className,
              )}
            >
              {children}
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
})

SideModal.displayName = 'SideModal'

export default SideModal
