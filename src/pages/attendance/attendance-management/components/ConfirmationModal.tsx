import React, { useState } from 'react'
import MainModal from '@jshrms/shared/components/Elements/Modals/MainModal'
import { Button, Textarea } from '@jshrms/ui'

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
    <MainModal className="max-w-xl" onClose={onClose} show={show}>
      <div className="flex flex-col gap-3">
        <h2 className="mt-4 text-center text-2xl font-semibold">{`Are you sure?`}</h2>
        <span className="text-center">{`Are you sure you want to ${modalType} this request?`}</span>
        {modalType === 'rejected' && (
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
    </MainModal>
  )
}

export default ConfirmationModal
