import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from 'lucide-react'

type PropTypes = {
  onClose?: () => void
  url?: null | string
}

const PreviewVideoResumeModal: React.FC<PropTypes> = ({ onClose, url }) => {
  const [videoUrl, setVideoUrl] = useState<string>()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (url) {
      setVideoUrl(url)
      setIsShow(true)
    }
  }, [url])

  const handleClose = () => {
    onClose?.()
    setIsShow(false)
  }

  return (
    <>
      <Transition appear as={Fragment} show={isShow}>
        <Dialog as="div" className="relative z-[999999]" onClose={handleClose}>
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

          <div className="fixed inset-0">
            <div className="flex h-full w-full items-center justify-center p-6">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative flex h-full items-center justify-center shadow-xl transition-all">
                  <button
                    className="text-error-600 hover:text-error-700 absolute -right-3 -top-3 z-50 focus:outline-none"
                    onClick={handleClose}
                  >
                    <XCircleIcon fill="white" size={32} />
                  </button>
                  <video className="h-full rounded-lg bg-black" controls loop src={videoUrl} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default PreviewVideoResumeModal
