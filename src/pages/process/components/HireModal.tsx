import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, InputDate, Modal, ModalFooter, ModalHeader, useToast } from '@jshrms/ui'
import moment from 'moment'
import * as yup from 'yup'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

const schema = yup.object({
  joinDate: yup.date().required().label('Join Date'),
})

type PropTypes = {
  applicantId?: string
  onClose?: () => void
  show?: boolean
}

const HireModal: React.FC<PropTypes> = ({ applicantId, onClose, show }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()
  const navigate = useNavigate()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async ({ joinDate }) => {
    setLoading(true)
    try {
      await processService.setJoinDate({ applicantId, joinDate: moment(joinDate).format('YYYY-MM-DD') })
      toast(`Join date for candidate set successfully.`, { color: 'success' })
      navigate('/process/onboarding')
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
      setLoading(false)
    }
  })

  return (
    <Modal as="form" onSubmit={onSubmit} show={!!show}>
      <ModalHeader onClose={onClose} subTitle="Add join date for this candidate">
        Hire Candidate
      </ModalHeader>
      <div className="p-3">
        <InputDate
          displayFormat="DD/MM/YYYY"
          error={errors.joinDate?.message}
          label="Join Date"
          labelRequired
          onValueChange={(v) => {
            setValue('joinDate', v)
            trigger('joinDate')
          }}
          value={getValues('joinDate')}
        />
      </div>
      <ModalFooter className="gap-3">
        <Button className="min-w-24" color="error" disabled={loading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="min-w-24" color="primary" disabled={loading} loading={loading} type="submit">
          Hire
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default HireModal
