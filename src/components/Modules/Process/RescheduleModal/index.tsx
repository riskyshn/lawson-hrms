import { Modal, ModalHeader, useRemember } from 'jobseeker-ui'
import React from 'react'
import ProcessForm from './ProcessForm'

type RescheduleModalProps = {
  show?: boolean
  applicant?: IDataTableApplicant
  onClose?: () => void
  onSubmited?: () => void
}

const RescheduleModal: React.FC<RescheduleModalProps> = ({ show, applicant, onSubmited, onClose }) => {
  const dataApplicant = useRemember(applicant)
  return (
    <Modal className="max-w-xl" show={!!show}>
      <ModalHeader subTitle="Add Schedule to Your Calendar" onClose={onClose}>
        Reschedule Your Process
      </ModalHeader>
      <>{dataApplicant && <ProcessForm applicant={dataApplicant} onSubmited={onSubmited} onClose={onClose} />}</>
    </Modal>
  )
}

export default RescheduleModal
