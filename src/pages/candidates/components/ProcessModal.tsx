import MainModal from '@/components/Elements/MainModal'
import { processService, vacancyService } from '@/services'
import { useOrganizationStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { Alert, Button, InputRadio, Spinner, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

type ProcessModalProps = {
  show: boolean
  onClose: () => void
  candidate?: ICandidate
}

const ProcessModal: React.FC<ProcessModalProps> = ({ show, candidate, onClose }) => {
  const [stages, setStages] = useState<{ interviews: IRecruitmentStage[]; assesments: IRecruitmentStage[] }>()

  const [stageId, setStageId] = useState('')

  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const { recruitmentStages } = useOrganizationStore()
  const toast = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const load = async (vacancyId: string) => {
      try {
        const vacancy = await vacancyService.fetchVacancyDetail(vacancyId)
        const processIds = vacancy.recruitmentProcess?.map((el) => el.id) || []
        const stages = recruitmentStages.filter((el) => processIds.includes(el.oid))

        const interviews = stages.filter((el) => el.type == 'INTERVIEW')
        const assesments = stages.filter((el) => el.type == 'ASSESMENT')
        setStages({ interviews, assesments })
      } catch (e) {
        toast(axiosErrorMessage(e))
        onClose()
      }
    }

    if (candidate?.vacancyId) load(candidate.vacancyId)

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [candidate])

  const handleNext = async () => {
    if (!stageId || !candidate?.id) return

    setLoading(true)
    try {
      const resp = await processService.updateProcess({
        applicantId: candidate.id,
        stageId: stageId,
      })

      toast('Process updated successfully', { color: 'success' })

      if (resp.type == 'INTERVIEW') {
        navigate('/process/interview')
      } else {
        navigate('/process/assessment')
      }
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
    }
    setLoading(false)
  }

  return (
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      <div className="mb-4">
        <h4 className="mb-2 text-2xl font-semibold">Process Update</h4>
        <p className="text-xs">Please select the process stage</p>
      </div>

      {stages && (
        <>
          {errorMessage && (
            <Alert color="error" className="mb-3">
              {errorMessage}
            </Alert>
          )}

          <div className="mb-3">
            <h6 className="mb-2 text-sm font-semibold">Interview</h6>
            {stages.interviews.map((option, index) => (
              <InputRadio
                className="mb-2"
                key={index}
                id={option.oid}
                name="stageId"
                value={option.type}
                checked={stageId == option.oid}
                onChange={() => setStageId(option.oid)}
              >
                {option.name}
              </InputRadio>
            ))}
          </div>

          <div className="mb-3">
            <h6 className="mb-2 text-sm font-semibold">Assesment</h6>
            {stages.assesments.map((option, index) => (
              <InputRadio
                className="mb-2"
                key={index}
                id={option.oid}
                name="stageId"
                value={option.type}
                checked={stageId == option.oid}
                onChange={() => setStageId(option.oid)}
              >
                {option.name}
              </InputRadio>
            ))}
          </div>
          <div className="mt-8 flex justify-end gap-3">
            <Button type="button" color="error" variant="light" className="w-24" disabled={loading && !!stageId} onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" color="primary" className="w-24" disabled={loading && !!stageId} loading={loading} onClick={handleNext}>
              Next
            </Button>
          </div>
        </>
      )}

      {!stages && (
        <div className="flex items-center justify-center py-48">
          <Spinner height={40} className="text-primary-600" />
        </div>
      )}
    </MainModal>
  )
}

export default ProcessModal
