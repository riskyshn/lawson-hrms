import MainModal from '@/components/Elements/Modals/MainModal'
import { Button, Select } from 'jobseeker-ui'
import React from 'react'

type RejectModalProps = {
  show: boolean
  onClose: () => void
}

const RejectModal: React.FC<RejectModalProps> = ({ show, onClose }) => {
  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Reject Candidate</h4>
        <p className="text-center">Please select the reason of why this candidate is rejected</p>
      </div>
      <Select label="Select Reason" placeholder="Underqualified, Salary Expectation Too High" options={[]} className="mb-3" />
      <div className="mt-8 flex justify-between">
        <Button onClick={onClose} color="primary" variant="light" className="mr-2 w-1/2">
          Cancel
        </Button>
        <Button color="primary" className="ml-2 w-1/2">
          Submit
        </Button>
      </div>
    </MainModal>
  )
}

export default RejectModal
