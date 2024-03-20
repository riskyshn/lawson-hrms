import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from 'lucide-react'

type PreviewImageModalProps = {
  imageUrl: string
  onClose: () => void
}

const PreviewImageModal: React.FC<PreviewImageModalProps> = ({ imageUrl, onClose }) => {
  return (
    <Transition appear show={true} as={React.Fragment}>
      <Dialog as="div" className="fixed inset-0 z-50 overflow-y-auto" onClose={onClose}>
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-70" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="my-8 inline-block w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
              <button className="absolute right-0 top-0 z-50 m-2 rounded-full bg-white p-3 shadow-md focus:outline-none" onClick={onClose}>
                <XCircleIcon size={24} />
              </button>
              <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-lg bg-white">
                <div className="z-10 flex max-h-full w-full justify-center overflow-auto">
                  <img src={imageUrl} alt="Image Preview" className="max-h-full max-w-full" />
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  )
}

export default PreviewImageModal
