import MainModal from '@/components/Elements/Modals/MainModal'
import { Button, Select } from 'jobseeker-ui'
import React from 'react'

type BlacklistModalProps = {
  onClose: () => void
  show: boolean
}

const BlacklistModal: React.FC<BlacklistModalProps> = ({ onClose, show }) => {
  return (
    <MainModal className="max-w-xl py-12" onClose={onClose} show={show}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Blacklist Candidate</h4>
        <p className="text-center">Please select the reason of why this candidate is Blacklist</p>
      </div>
      <Select className="mb-3" label="Select Reason" options={[]} placeholder="Underqualified, Salary Expectation Too High" />
      <div className="mt-8 flex justify-between">
        <Button className="mr-2 w-1/2" color="primary" onClick={onClose} variant="light">
          Cancel
        </Button>
        <Button className="ml-2 w-1/2" color="primary">
          Submit
        </Button>
      </div>
    </MainModal>
  )
}

export default BlacklistModal
