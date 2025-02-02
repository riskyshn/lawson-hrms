import React, { useState } from 'react'
import { Button, Modal, Textarea } from 'jobseeker-ui'

interface ConfirmationModalProps {
  handleAction: (reason: string) => void
  isLoading?: boolean
  modalType?: string
  onClose: () => void
  show: boolean
  type?: string
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ handleAction, isLoading, onClose, show, type }) => {
  const [reason, setReason] = useState('')
  const [error, setError] = useState<null | string>(null)

  const handleSubmit = () => {
    if (!reason.trim() && type === 'Reject') {
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
    <Modal onClose={onClose} show={show}>
      <div className="flex flex-col gap-3 p-3">
        <h2 className="mt-4 text-center text-2xl font-semibold">{`Are you sure?`}</h2>
        <span className="text-center">{`Are you sure you want to ${type} this request?`}</span>
        {type === 'Reject' && (
          <>
            <Textarea aria-invalid={!!error} onChange={handleChange} rows={4} value={reason} />
            {error && <span className="mb-2 text-xs text-red-500">{error}</span>}
          </>
        )}
        <div className="flex flex-1 justify-end gap-3">
          <Button className="w-full" color="error" onClick={onClose} type="button" variant="light">
            Cancel
          </Button>
          <Button className="w-full" color="primary" disabled={isLoading} onClick={handleSubmit}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default ConfirmationModal
