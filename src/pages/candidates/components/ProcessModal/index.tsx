import MainModal from '@/components/Elements/MainModal'
import { vacancyService } from '@/services'
import { useOrganizationStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { Spinner, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import ProcessForm from './ProcessForm'
import StagePickerForm from './StagePickerForm'

type ProcessModalProps = {
  show: boolean
  onClose: () => void
  candidate?: ICandidate
}

const ProcessModal: React.FC<ProcessModalProps> = ({ show, candidate, onClose }) => {
  const [stages, setStages] = useState<{ interviews: IRecruitmentStage[]; assesments: IRecruitmentStage[] }>()

  const [tab, setTab] = useState(0)
  const [stageId, setStageId] = useState('')

  const { recruitmentStages } = useOrganizationStore()
  const toast = useToast()

  useEffect(() => {
    const load = async (vacancyId: string) => {
      try {
        const vacancy = await vacancyService.fetchVacancyDetail(vacancyId)
        const processIds = vacancy.recruitmentProcess?.map((el) => el.oid) || []
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

  const stage = recruitmentStages.find((el) => el.oid == stageId)

  return (
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      <div className="mb-4">
        <h4 className="mb-2 text-2xl font-semibold">{tab ? 'Schedule Your Process' : 'Process Update'}</h4>
        <p className="text-xs">{tab ? 'Add Process to Your Calendar' : 'Please select the process stage'}</p>
      </div>

      {stages && (
        <>
          {!tab ? (
            <StagePickerForm stages={stages} value={stageId} onValueChange={setStageId} onCancel={onClose} onNext={() => setTab(1)} />
          ) : (
            <>{candidate && stage && <ProcessForm stage={stage} candidate={candidate} onPrev={() => setTab(0)} />}</>
          )}
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
