import MainModal from '@/components/Elements/Modals/MainModal'
import { candidateService, vacancyService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Button, OptionProps, Select, Spinner, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'

type MoveAnotherVacancyModalProps = {
  applicant?: IDataTableApplicant
  onApplied?: () => void
  onClose?: () => void
  show?: boolean
}

const MoveAnotherVacancyModal: React.FC<MoveAnotherVacancyModalProps> = ({ applicant, onApplied, onClose, show }) => {
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
    <MainModal className="max-w-xl py-12" onClose={onClose} show={!!show}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Move to Another Vacancy</h4>
        <p className="text-center">Move candidates to a more suitable job vacancy</p>
      </div>

      {vacancies && (
        <>
          <Select
            className="mb-3"
            label="Select Vacancy"
            onChange={(v) => setSelectedVacancyId(String(v))}
            options={vacancies.filter((el) => el.value !== applicant?.vacancy?.oid)}
            placeholder="Select Vacancy"
            value={selectedVacancyId}
          />
          <Button
            block
            className="mx-auto"
            color="primary"
            disabled={loading}
            loading={loading}
            onClick={handleSelectVacancy}
            type="button"
          >
            Select Vacancy
          </Button>
        </>
      )}

      {!vacancies && (
        <div className="flex items-center justify-center py-48">
          <Spinner className="text-primary-600" height={40} />
        </div>
      )}
    </MainModal>
  )
}

export default MoveAnotherVacancyModal
