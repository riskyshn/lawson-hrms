import MainModal from '@/components/Elements/Modals/MainModal'
import { Button, Select } from 'jobseeker-ui'
import React from 'react'

type MoveAnotherVacancyModalProps = {
  onClose: () => void
  show: boolean
}

const MoveAnotherVacancyModal: React.FC<MoveAnotherVacancyModalProps> = ({ onClose, show }) => {
  return (
    <MainModal className="max-w-xl py-12" onClose={onClose} show={show}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Apply to Vacancy</h4>
        <p className="text-center">Move candidates to a more suitable job vacancy</p>
      </div>
      <Select className="mb-3" label="Select Vacancy" options={[]} placeholder="Back-End Developer, Cashier, Barista" />
      <Button block className="mx-auto" color="primary">
        Select Vacancy
      </Button>
    </MainModal>
  )
}

export default MoveAnotherVacancyModal
