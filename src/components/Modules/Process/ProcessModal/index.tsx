import type { IApplicantStage, IDataTableApplicant } from '@/types'
import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, Spinner, useToast } from '@jshrms/ui'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import ProcessForm from './ProcessForm'
import StagePickerForm from './StagePickerForm'

type ProcessModalProps = {
  applicant?: IDataTableApplicant
  onClose?: () => void
  onSubmited?: () => void
  show?: boolean
}

const ProcessModal: React.FC<ProcessModalProps> = ({ applicant, onClose, onSubmited, show }) => {
  const [stages, setStages] = useState<{ assessments: IApplicantStage[]; interviews: IApplicantStage[] }>()
  const [dataApplicant, setDataApplicant] = useState<IDataTableApplicant>()

  const [tab, setTab] = useState(0)
  const [stageId, setStageId] = useState('')

  const toast = useToast()

  useEffect(() => {
    const load = async (applicantId: string) => {
      try {
        const stages = await processService.fetchDetailStages(applicantId)
        const interviews = stages.content.filter((el) => el.type == 'INTERVIEW')
        const assessments = stages.content.filter((el) => el.type == 'ASSESSMENT')
        setStages({ assessments, interviews })
      } catch (e) {
        toast(axiosErrorMessage(e))
        onClose?.()
      }
    }

    if (applicant) {
      setDataApplicant(applicant)
      load(applicant.oid)
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [applicant])

  const stage = stages?.assessments.find((el) => el.oid == stageId) || stages?.interviews.find((el) => el.oid == stageId)

  return (
    <Modal className="max-w-xl" show={!!show}>
      <ModalHeader onClose={onClose} subTitle={tab ? 'Add Process to Your Calendar' : 'Please select the process stage'}>
        {tab ? 'Schedule Your Process' : 'Process Update'}
      </ModalHeader>
      {!stages && (
        <div className="flex items-center justify-center py-48">
          <Spinner className="text-primary-600" height={40} />
        </div>
      )}
      {stages && (
        <>
          {!tab ? (
            <StagePickerForm onCancel={onClose} onNext={() => setTab(1)} onValueChange={setStageId} stages={stages} value={stageId} />
          ) : (
            <>
              {dataApplicant && stage && (
                <ProcessForm applicant={dataApplicant} onClose={onClose} onPrev={() => setTab(0)} onSubmited={onSubmited} stage={stage} />
              )}
            </>
          )}
        </>
      )}
    </Modal>
  )
}

export default ProcessModal
