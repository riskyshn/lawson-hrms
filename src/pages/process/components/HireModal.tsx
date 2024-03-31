import React, { useState } from 'react'
import { Button, InputDate, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigate } from 'react-router-dom'
import { axiosErrorMessage } from '@/utils/axios'
import { processService } from '@/services'
import moment from 'moment'

const schema = yup.object({
  joinDate: yup.date().required().label('Join Date'),
})

type PropTypes = {
  show?: boolean
  applicant?: IDataTableApplicant
  onClose?: () => void
}

const HireModal: React.FC<PropTypes> = ({ show, applicant, onClose }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async ({ joinDate }) => {
    if (!applicant) return
    setLoading(true)
    try {
      await processService.setJoinDate({
        applicantId: applicant.oid,
        joinDate: moment(joinDate).format('YYYY-MM-DD'),
      })
      toast(`Join date for ${applicant.candidate?.name} set successfully.`, { color: 'success' })
      navigate('/process/onboarding')
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
      setLoading(false)
    }
  })

  return (
    <Modal as="form" show={!!show} onSubmit={onSubmit}>
      <ModalHeader subTitle="Add join date for this candidate" onClose={onClose}>
        Hire Candidate
      </ModalHeader>
      <div className="p-3">
        <InputDate
          label="Join Date"
          labelRequired
          error={errors.joinDate?.message}
          asSingle
          useRange={false}
          displayFormat="DD/MM/YYYY"
          value={{ startDate: getValues('joinDate'), endDate: getValues('joinDate') }}
          onChange={(v) => {
            // @ts-expect-error
            setValue('joinDate', v?.startDate || v?.endDate)
            trigger('joinDate')
          }}
        />
      </div>
      <ModalFooter className="gap-3">
        <Button type="button" color="error" variant="light" className="min-w-24" disabled={loading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" className="min-w-24" disabled={loading} loading={loading}>
          Hire
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default HireModal
