import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalFooter, ModalHeader } from 'jobseeker-ui'
import { FileInputIcon, Link2Icon } from 'lucide-react'
import CreateCandidateModal from './CreateCandidateModal'
import SendLinkModal from './SendLinkModal'

const UploadResumeModal: React.FC<{ onClose?: () => void; show?: boolean }> = ({ onClose, show }) => {
  const [showModal, setShowModal] = useState<'CREATE_CANDIDATE' | 'SEND_LINK'>()

  useEffect(() => {
    if (showModal || show) {
      document.body.classList.add('overflow-hidden')
    } else {
      document.body.classList.remove('overflow-hidden')
    }
  }, [showModal, show])

  return <CreateCandidateModal onClose={onClose} onSubmited={onClose} show={show} />

  return (
    <>
      <SendLinkModal onClose={() => setShowModal(undefined)} onSubmited={onClose} show={showModal === 'SEND_LINK'} />
      <CreateCandidateModal onClose={() => setShowModal(undefined)} onSubmited={onClose} show={showModal === 'CREATE_CANDIDATE'} />
      <Modal onClose={onClose} show={!!show && typeof showModal === 'undefined'}>
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
          <Button className="w-24" color="error" onClick={onClose} type="button" variant="light">
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default UploadResumeModal
