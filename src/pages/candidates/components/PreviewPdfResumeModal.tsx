import { Fragment, useEffect, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XCircleIcon } from 'lucide-react'

type PropTypes = {
  onClose?: () => void
  url?: null | string
}

const PreviewPdfResumeModal: React.FC<PropTypes> = ({ onClose, url }) => {
  const [pdfUrl, setPdfUrl] = useState<string>()
  const [isShow, setIsShow] = useState(false)

  useEffect(() => {
    if (url) {
      setPdfUrl(url)
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
                <Dialog.Panel className="relative flex h-full w-full items-center justify-center shadow-xl transition-all">
                  <button
                    className="absolute -right-3 -top-3 z-50 text-error-600 hover:text-error-700 focus:outline-none"
                    onClick={handleClose}
                  >
                    <XCircleIcon fill="white" size={32} />
                  </button>
                  <iframe className="block h-full w-full rounded-lg bg-white" src={pdfUrl} />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}

export default PreviewPdfResumeModal
