import type { IDataTableApplicant, IProcessSchedule } from '../../../../types'
import React, { useEffect, useState } from 'react'
import { Modal, ModalHeader, useRemember } from '@jshrms/ui'
import { processService } from '../../../../services'
import LoadingScreen from '../../../Elements/Layout/LoadingScreen'
import ProcessForm from './ProcessForm'

type RescheduleModalProps = {
  applicant?: IDataTableApplicant
  onClose?: () => void
  onSubmited?: () => void
  show?: boolean
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ applicant, onClose, onSubmited, show }) => {
  const dataApplicant = useRemember(applicant)
  const [schedule, setSchedule] = useState<IProcessSchedule | null>(null)

  useEffect(() => {
    const controller = new AbortController()
    const load = async (applicantId: string, signal: AbortSignal) => {
      const data = await processService.fetchScheduleProcess(applicantId, signal)
      setSchedule(data)
    }

    if (dataApplicant?.oid) {
      setSchedule(null)
      load(dataApplicant?.oid, controller.signal)
    }
    return () => controller.abort()
  }, [dataApplicant?.oid])

  return (
    <Modal className="max-w-xl" show={!!show}>
      <ModalHeader onClose={onClose} subTitle="Add Schedule to Your Calendar">
        Reschedule Your Process
      </ModalHeader>
      <LoadingScreen show={!schedule} />
      {dataApplicant && schedule && <ProcessForm applicant={dataApplicant} schedule={schedule} onClose={onClose} onSubmited={onSubmited} />}
    </Modal>
  )
}

export default RescheduleModal
