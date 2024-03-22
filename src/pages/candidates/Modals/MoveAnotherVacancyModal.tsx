import React, { useEffect, useState } from 'react'
import { Select, Button, useToast } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { candidateService, vacancyService } from '@/services'

type MoveAnotherVacancyModalProps = {
  show: boolean
  onClose: () => void
  candidate: any
  onApplyVacancy: (data: string) => void
}

const MoveAnotherVacancyModal: React.FC<MoveAnotherVacancyModalProps> = ({ show, onClose, candidate, onApplyVacancy }) => {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | number>('')
  const [vacancies, setVacancies] = useState<any[]>([])
  const toast = useToast()

  useEffect(() => {
    fetchVacancies()
  }, [])

  const fetchVacancies = async () => {
    try {
      const data = await vacancyService.fetchVacancies()
      setVacancies(data.content)
    } catch (error) {
      console.error('Error fetching vacancies:', error)
    }
  }

  const handleChange = (selectedValue: string | number) => {
    setSelectedVacancyId(selectedValue)
  }

  const handleSelectVacancy = () => {
    if (!selectedVacancyId) {
      return
    }

    const payload = {
      candidateId: candidate.candidateId,
      vacancyId: candidate.vacancyId,
      newVacancyId: selectedVacancyId,
    }

    candidateService
      .moveToAnotherVacancy(payload)
      .then(() => {
        toast('Apply to another vacancy successfully created.', { color: 'success' })
        onClose()
        const newData = new Date().toISOString()
        onApplyVacancy(newData)
      })
      .catch(() => {
        toast('An error occurred while creating apply to another vacancy.', { color: 'error' })
      })
  }

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Move to Another Vacancy</h4>
        <p className="text-center">Move candidates to a more suitable job vacancy</p>
      </div>
      <Select
        label="Select Vacancy"
        placeholder="Select Vacancy"
        options={vacancies.map((vacancy) => ({ value: vacancy.id, label: vacancy.vacancyName }))}
        className="mb-3"
        value={selectedVacancyId}
        onChange={handleChange}
      />
      <Button block color="primary" className="mx-auto" onClick={handleSelectVacancy}>
        Select Vacancy
      </Button>
    </MainModal>
  )
}

export default MoveAnotherVacancyModal
