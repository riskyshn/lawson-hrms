import React, { useState } from 'react'
import { Select, Button } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { candidateService } from '@/services'

type MoveAnotherVacancyModalProps = {
  show: boolean
  onClose: () => void
  candidate: any
}

const ApplyVacancyModal: React.FC<MoveAnotherVacancyModalProps> = ({ show, onClose, candidate }) => {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | number>('')
  const handleChange = (selectedValue: string | number) => {
    const parsedValue = parseInt(selectedValue.toString())
    setSelectedVacancyId(parsedValue)
  }

  const handleSelectVacancy = () => {
    if (!selectedVacancyId) {
      return
    }

    const payload = {
      candidateId: candidate.candidateId,
      vacancyId: candidate.id,
      newVacancyId: selectedVacancyId,
    }

    candidateService
      .moveToAnotherVacancy(payload)
      .then((data) => {
        console.log('Candidate moved to another vacancy:', data)
        onClose()
      })
      .catch((error) => {
        console.error('Error moving candidate to another vacancy:', error)
      })
  }

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Apply to Vacancy</h4>
        <p className="text-center">Apply candidates to a more suitable job vacancy</p>
      </div>
      <Select
        label="Select Vacancy"
        placeholder="Back-End Developer, Cashier, Barista"
        options={[]}
        className="mb-3"
        onChange={handleChange}
      />
      <Button block color="primary" className="mx-auto" onClick={handleSelectVacancy}>
        Select Vacancy
      </Button>
    </MainModal>
  )
}

export default ApplyVacancyModal
