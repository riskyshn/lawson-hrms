import MainModal from '@/components/Elements/MainModal'
import { candidateService } from '@/services'
import { Button, Select, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'

type MoveAnotherVacancyModalProps = {
  show: boolean
  onClose: () => void
  candidate: any
  onApplyVacancy: (data: string) => void
}

const MoveAnotherVacancyModal: React.FC<MoveAnotherVacancyModalProps> = ({ show, onClose, candidate, onApplyVacancy }) => {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | number>('')
  const [vacancies, setVacancies] = useState<any[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()

  useEffect(() => {
    fetchVacancies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchVacancies = async () => {
    try {
      const data = await candidateService.fetchVacanciesCandidate(candidate.candidateId)
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
      applicantId: candidate.id,
      vacancyId: selectedVacancyId,
    }

    setLoading(true)
    candidateService
      .moveToAnotherVacancy(payload)
      .then(() => {
        toast('Apply to another vacancy successfully created.', { color: 'success' })
        onClose()
        const newData = new Date().toISOString()
        onApplyVacancy(newData)
      })
      .catch((error: any) => {
        const errorMessage = error.response?.data?.meta?.message || error.message
        toast(errorMessage, { color: 'error', position: 'top-right' })
      })
      .finally(() => {
        setLoading(false)
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
        options={vacancies.map((vacancy) => ({ value: vacancy.oid, label: vacancy.vacancyName }))}
        className="mb-3"
        value={selectedVacancyId}
        onChange={handleChange}
      />
      <Button block type="button" color="primary" className="mx-auto" loading={loading} onClick={handleSelectVacancy}>
        Select Vacancy
      </Button>
    </MainModal>
  )
}

export default MoveAnotherVacancyModal
