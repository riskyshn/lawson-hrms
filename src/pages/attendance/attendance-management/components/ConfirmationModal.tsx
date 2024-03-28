import React from 'react'
import MainModal from '@/components/Elements/MainModal'
import { Button } from 'jobseeker-ui'

type ConfirmationModalProps = {
  show: boolean
  onClose: () => void
  onConfirm: () => void
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ show, onClose, onConfirm }) => {
  return (
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      <div className="text-center">
        <h3 className="text-2xl font-semibold">Are you sure you want to proceed?</h3>
        <p className="text-sm">This action cannot be undone.</p>
      </div>
      <div className="mt-8 flex justify-end gap-3">
        <Button type="button" color="error" variant="light" className="w-24" onClick={onClose}>
          Cancel
        </Button>
        <Button type="button" color="primary" className="w-24" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </MainModal>
  )
}

export default ConfirmationModal
