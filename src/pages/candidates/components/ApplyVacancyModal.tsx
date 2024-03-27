import MainModal from '@/components/Elements/MainModal'
import { candidateService, vacancyService } from '@/services'
import { Button, Select, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'

type ApplyVacancyModalProps = {
  show: boolean
  onClose: () => void
  candidate: any
  onApplyVacancy: (data: string) => void
}

const ApplyVacancyModal: React.FC<ApplyVacancyModalProps> = ({ show, onClose, candidate, onApplyVacancy }) => {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string | number>('')
  const [vacancies, setVacancies] = useState<any[]>([])
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)

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
      vacancyId: selectedVacancyId,
      candidateId: candidate.id,
    }

    setLoading(true)
    candidateService
      .applyVacancy(payload)
      .then(() => {
        toast('Apply to vacancy successfully created.', { color: 'success' })
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
        <h4 className="mb-2 text-center text-2xl font-semibold">Apply to Vacancy</h4>
        <p className="text-center">Apply candidates to a more suitable job vacancy</p>
      </div>
      <Select
        label="Select Vacancy"
        placeholder="Select Vacancy"
        options={vacancies.map((vacancy) => ({ value: vacancy.oid, label: vacancy.vacancyName }))}
        className="mb-3"
        value={selectedVacancyId}
        onChange={handleChange}
      />
      <Button block loading={loading} color="primary" className="mx-auto" onClick={handleSelectVacancy}>
        Select Vacancy
      </Button>
    </MainModal>
  )
}

export default ApplyVacancyModal
