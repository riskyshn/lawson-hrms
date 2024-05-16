import React, { useState } from 'react'
import { Button, Modal, ModalFooter, ModalHeader, Textarea } from 'jobseeker-ui'

interface ConfirmationModalProps {
  handleAction: (reason: string) => void
  isLoading: boolean
  modalType?: string
  onClose: () => void
  show: boolean
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ handleAction, isLoading, modalType, onClose, show }) => {
  const [reason, setReason] = useState('')
  const [error, setError] = useState<null | string>(null)

  const handleSubmit = () => {
    if (!reason.trim() && modalType === 'rejected') {
      setError('Reason is required.')
    } else {
      handleAction(reason)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReason(e.target.value)
    setError(null)
  }

  return (
    <Modal show={show} onClose={onClose}>
      <ModalHeader subTitle={`Are you sure you want to ${modalType} this request?`} onClose={onClose}>
        Are you sure?
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {modalType === 'rejected' && (
          <>
            <Textarea aria-invalid={!!error} onChange={handleChange} rows={4} value={reason} />
            {error && <span className="mb-2 text-xs text-red-500">{error}</span>}
          </>
        )}
      </div>
      <ModalFooter>
        <Button className="min-w-24" color="error" onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="min-w-24" color="primary" disabled={isLoading} onClick={handleSubmit}>
          Confirm
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ConfirmationModal
