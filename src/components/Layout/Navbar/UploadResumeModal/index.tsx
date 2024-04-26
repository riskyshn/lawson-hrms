import { Button, Modal, ModalFooter, ModalHeader } from 'jobseeker-ui'
import { FileInputIcon, Link2Icon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CreateCandidateModal from './CreateCandidateModal'
import SendLinkModal from './SendLinkModal'

const UploadResumeModal: React.FC<{ show?: boolean; onClose?: () => void }> = ({ show, onClose }) => {
  const [showModal, setShowModal] = useState<'SEND_LINK' | 'CREATE_CANDIDATE'>()

  useEffect(() => {
    if (showModal || show) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [showModal, show])

  return (
    <>
      <SendLinkModal show={showModal === 'SEND_LINK'} onClose={() => setShowModal(undefined)} onSubmited={onClose} />
      <CreateCandidateModal show={showModal === 'CREATE_CANDIDATE'} onClose={() => setShowModal(undefined)} onSubmited={onClose} />
      <Modal show={!!show && typeof showModal === 'undefined'} onClose={onClose}>
        <ModalHeader subTitle="Add Candidate Data into Your Talent Pool">Upload Resume</ModalHeader>
        <div className="grid grid-cols-2 divide-x">
          <button
            className="flex h-auto flex-col items-center justify-center gap-3 bg-white px-6 py-12 text-center hover:bg-primary-50"
            onClick={() => setShowModal('SEND_LINK')}
          >
            <span className="block text-primary-600">
              <Link2Icon className="block h-20 w-20" strokeWidth={1.2} />
            </span>
            <span className="block">
              <span className="block text-lg font-semibold">Send Link</span>
              <span className="block text-xs">Get candidate information by sending form to your candidates</span>
            </span>
          </button>
          <button
            className="flex h-auto flex-col items-center justify-center gap-3 bg-white px-6 py-12 text-center hover:bg-primary-50"
            onClick={() => setShowModal('CREATE_CANDIDATE')}
          >
            <span className="block text-primary-600">
              <FileInputIcon className="block h-20 w-20" strokeWidth={1.2} />
            </span>
            <span className="block">
              <span className="block text-lg font-semibold">Fill Candidate Form</span>
              <span className="block text-xs">Input candidate information by filling out candidate form</span>
            </span>
          </button>
        </div>
        <ModalFooter>
          <Button type="button" color="error" variant="light" className="w-24" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default UploadResumeModal
