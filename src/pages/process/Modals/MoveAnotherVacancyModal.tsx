import React from 'react'
import { Select, Button } from 'jobseeker-ui'
import MainModal from '@/components/Elements/Modals/MainModal'

type MoveAnotherVacancyModalProps = {
  show: boolean
  onClose: () => void
}

const MoveAnotherVacancyModal: React.FC<MoveAnotherVacancyModalProps> = ({ show, onClose }) => {
  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Apply to Vacancy</h4>
        <p className="text-center">Move candidates to a more suitable job vacancy</p>
      </div>
      <Select label="Select Vacancy" placeholder="Back-End Developer, Cashier, Barista" options={[]} className="mb-3" />
      <Button block color="primary" className="mx-auto">
        Select Vacancy
      </Button>
    </MainModal>
  )
}

export default MoveAnotherVacancyModal
