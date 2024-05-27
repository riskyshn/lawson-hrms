import type { ICandidate, IVacancy } from '@/types'
import React, { useEffect, useState } from 'react'
import { Button, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import { candidateService } from '@/services'

type ApplyVacancyModalProps = {
  item: ICandidate
  onApplyVacancy: (data: string) => void
  onClose: () => void
  show: boolean
}

const ApplyVacancyModal: React.FC<ApplyVacancyModalProps> = ({ item, onApplyVacancy, onClose, show }) => {
  const [selectedVacancyId, setSelectedVacancyId] = useState<string>('')
  const [vacancies, setVacancies] = useState<IVacancy[]>([])
  const toast = useToast()
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchVacancies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchVacancies = async () => {
    try {
      const data = await candidateService.fetchVacanciesCandidate(item?.oid || '')
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
      candidateId: item?.oid,
      vacancyId: selectedVacancyId,
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
        toast(errorMessage, { color: 'error' })
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <Modal show={show} hideCloseButton onClose={onClose}>
      <ModalHeader subTitle="Apply candidates to a more suitable job vacancy">Apply to Vacancy</ModalHeader>
      <div className="p-3">
        <Select
          className="mb-3"
          label="Select Vacancy"
          onChange={handleChange}
          options={vacancies.map((vacancy) => ({ label: vacancy.vacancyName, value: vacancy.oid }))}
          placeholder="Select Vacancy"
          value={selectedVacancyId}
        />
      </div>
      <ModalFooter>
        <Button color="primary" loading={loading} onClick={handleSelectVacancy}>
          Select Vacancy
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ApplyVacancyModal
