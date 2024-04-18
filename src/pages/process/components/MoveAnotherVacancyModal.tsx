import MainModal from '@/components/Elements/Modals/MainModal'
import { candidateService, vacancyService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, OptionProps, Select, Spinner, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'

type MoveAnotherVacancyModalProps = {
  show?: boolean
  applicant?: IDataTableApplicant
  onClose?: () => void
  onApplied?: () => void
}

const MoveAnotherVacancyModal: React.FC<MoveAnotherVacancyModalProps> = ({ show, applicant, onClose, onApplied }) => {
  const [selectedVacancyId, setSelectedVacancyId] = useState('')
  const [vacancies, setVacancies] = useState<OptionProps[]>()
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  useEffect(() => {
    const load = async () => {
      const data = await vacancyService.fetchVacancies()
      setVacancies(data.content.map((el) => ({ label: `${el.vacancyName} (${el.rrNumber})`, value: el.oid })))
    }

    if (show && !vacancies) load()

    if (show) setSelectedVacancyId('')
  }, [show, vacancies])

  const handleSelectVacancy = async () => {
    if (!selectedVacancyId || !applicant) return

    setLoading(true)
    try {
      await candidateService.moveToAnotherVacancy({
        applicantId: applicant.oid,
        vacancyId: selectedVacancyId,
      })

      toast('Apply to another vacancy successfully created.', { color: 'success' })
      onApplied?.()
      onClose?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  }

  return (
    <MainModal className="max-w-xl py-12" show={!!show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Move to Another Vacancy</h4>
        <p className="text-center">Move candidates to a more suitable job vacancy</p>
      </div>

      {vacancies && (
        <>
          <Select
            label="Select Vacancy"
            placeholder="Select Vacancy"
            options={vacancies.filter((el) => el.value !== applicant?.vacancy?.oid)}
            className="mb-3"
            value={selectedVacancyId}
            onChange={(v) => setSelectedVacancyId(String(v))}
          />
          <Button
            block
            type="button"
            color="primary"
            className="mx-auto"
            disabled={loading}
            loading={loading}
            onClick={handleSelectVacancy}
          >
            Select Vacancy
          </Button>
        </>
      )}

      {!vacancies && (
        <div className="flex items-center justify-center py-48">
          <Spinner height={40} className="text-primary-600" />
        </div>
      )}
    </MainModal>
  )
}

export default MoveAnotherVacancyModal
