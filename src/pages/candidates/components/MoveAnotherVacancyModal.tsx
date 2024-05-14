import type { ICandidate, IVacancy } from '@/types'
import React, { useEffect, useState } from 'react'
import { Button, Select, useToast } from '@jshrms/ui'
import MainModal from '@/components/Elements/Modals/MainModal'
import { candidateService } from '@/services'

type MoveAnotherVacancyModalProps = {
  candidate: ICandidate
  onApplyVacancy: (data: string) => void
  onClose: () => void
  show: boolean
}

const MoveAnotherVacancyModal: React.FC<MoveAnotherVacancyModalProps> = ({ candidate, onApplyVacancy, onClose, show }) => {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>('')
  const [vacancies, setVacancies] = useState<IVacancy[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()

  useEffect(() => {
    fetchVacancies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchVacancies = async () => {
    try {
      const data = await candidateService.fetchVacanciesCandidate(candidate?.candidateId || '')
      setVacancies(data.content)
    } catch (error) {
      console.error('Error fetching vacancies:', error)
    }
  }

  const handleChange = (selectedValue: string) => {
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
        toast(errorMessage, { color: 'error' })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <MainModal className="max-w-xl py-12" onClose={onClose} show={show}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Move to Another Vacancy</h4>
        <p className="text-center">Move candidates to a more suitable job vacancy</p>
      </div>
      <Select
        className="mb-3"
        label="Select Vacancy"
        onChange={handleChange}
        options={vacancies.map((vacancy) => ({ label: vacancy.vacancyName, value: vacancy.oid }))}
        placeholder="Select Vacancy"
        value={selectedVacancyId}
      />
      <Button block className="mx-auto" color="primary" loading={loading} onClick={handleSelectVacancy} type="button">
        Select Vacancy
      </Button>
    </MainModal>
  )
}

export default MoveAnotherVacancyModal
