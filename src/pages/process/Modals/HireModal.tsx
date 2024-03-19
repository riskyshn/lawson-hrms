import React from 'react'
import { Select, Button, InputDate } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'

type HireModalProps = {
  show: boolean
  onClose: () => void
}

const HireModal: React.FC<HireModalProps> = ({ show, onClose }) => {
  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Hire Candidate</h4>
        <p className="text-center">Add join date for this candidate</p>
      </div>
      <InputDate asSingle displayFormat="DD/MM/YYYY" />
      <Button block color="primary" className="mx-auto">
        Confirm
      </Button>
    </MainModal>
  )
}

export default HireModal
