import React, { useState } from 'react'
import { Button, Textarea } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'

interface ConfirmationModalProps {
  show: boolean
  onClose: () => void
  isLoading: boolean
  modalType?: string
  handleAction: (reason: string) => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onClose, isLoading, modalType, handleAction }) => {
  const [reason, setReason] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = () => {
    if (!reason.trim()) {
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
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      <div className="flex flex-col gap-3">
        <h2 className="mt-4 text-center text-2xl font-semibold">{`Are you sure?`}</h2>
        <span className="text-center">{`Are you sure you want to ${modalType?.toLowerCase()} this request?`}</span>
        <Textarea rows={4} value={reason} onChange={handleChange} aria-invalid={!!error} />
        {error && <span className="mb-2 text-xs text-red-500">{error}</span>}
        <div className="flex flex-1 justify-end gap-3">
          <Button type="button" color="error" variant="light" className="w-full" onClick={onClose}>
            Cancel
          </Button>
          <Button color="primary" onClick={handleSubmit} className="w-full" disabled={isLoading}>
            Confirm
          </Button>
        </div>
      </div>
    </MainModal>
  )
}

export default ConfirmationModal
