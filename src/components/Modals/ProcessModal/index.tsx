import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { Modal, ModalHeader, Spinner, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import ProcessForm from './ProcessForm'
import StagePickerForm from './StagePickerForm'

type ProcessModalProps = {
  show?: boolean
  applicant?: IDataTableApplicant
  onClose?: () => void
  onSubmited?: () => void
}

const ProcessModal: React.FC<ProcessModalProps> = ({ show, applicant, onSubmited, onClose }) => {
  const [stages, setStages] = useState<{ interviews: IApplicantStage[]; assesments: IApplicantStage[] }>()
  const [dataApplicant, setDataApplicant] = useState<IDataTableApplicant>()

  const [tab, setTab] = useState(0)
  const [stageId, setStageId] = useState('')

  const toast = useToast()

  useEffect(() => {
    const load = async (applicantId: string) => {
      try {
        const stages = await processService.fetchDetailStages(applicantId)
        const interviews = stages.content.filter((el) => el.type == 'INTERVIEW')
        const assesments = stages.content.filter((el) => el.type == 'ASSESMENT')
        setStages({ interviews, assesments })
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

  const stage = stages?.assesments.find((el) => el.oid == stageId) || stages?.interviews.find((el) => el.oid == stageId)

  return (
    <Modal className="max-w-xl" show={!!show}>
      <ModalHeader subTitle={tab ? 'Add Process to Your Calendar' : 'Please select the process stage'} onClose={onClose}>
        {tab ? 'Schedule Your Process' : 'Process Update'}
      </ModalHeader>
      {!stages && (
        <div className="flex items-center justify-center py-48">
          <Spinner height={40} className="text-primary-600" />
        </div>
      )}
      {stages && (
        <>
          {!tab ? (
            <StagePickerForm stages={stages} value={stageId} onValueChange={setStageId} onCancel={onClose} onNext={() => setTab(1)} />
          ) : (
            <>
              {dataApplicant && stage && (
                <ProcessForm stage={stage} applicant={dataApplicant} onPrev={() => setTab(0)} onSubmited={onSubmited} onClose={onClose} />
              )}
            </>
          )}
        </>
      )}
    </Modal>
  )
}

export default ProcessModal
