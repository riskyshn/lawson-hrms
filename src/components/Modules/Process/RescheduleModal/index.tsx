import { Modal, ModalHeader, useRemember } from 'jobseeker-ui'
import React from 'react'

import ProcessForm from './ProcessForm'

type RescheduleModalProps = {
  applicant?: IDataTableApplicant
  onClose?: () => void
  onSubmited?: () => void
  show?: boolean
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ applicant, onClose, onSubmited, show }) => {
  const dataApplicant = useRemember(applicant)
  return (
    <Modal className="max-w-xl" show={!!show}>
      <ModalHeader onClose={onClose} subTitle="Add Schedule to Your Calendar">
        Reschedule Your Process
      </ModalHeader>
      <>{dataApplicant && <ProcessForm applicant={dataApplicant} onClose={onClose} onSubmited={onSubmited} />}</>
    </Modal>
  )
}

export default RescheduleModal
