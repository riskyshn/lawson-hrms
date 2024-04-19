import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, InputDate, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const schema = yup.object({
  joinDate: yup.date().required().label('Join Date'),
})

type PropTypes = {
  show?: boolean
  applicant?: IDataTableApplicant
  onClose?: () => void
  onUpdated?: () => void
}

const EditJoinDateModal: React.FC<PropTypes> = ({ show, applicant, onClose, onUpdated }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (show && applicant?.actionAt) {
      setValue('joinDate', new Date(applicant.actionAt))
      trigger('joinDate')
    }
  }, [show, applicant?.actionAt, setValue, trigger])

  const onSubmit = handleSubmit(async ({ joinDate }) => {
    if (!applicant) return
    setLoading(true)
    try {
      await processService.setJoinDate({
        applicantId: applicant.oid,
        joinDate: moment(joinDate).format('YYYY-MM-DD'),
      })
      toast(`Join date for ${applicant.candidate?.name} updated successfully.`, { color: 'success' })
      onClose?.()
      onUpdated?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  })

  return (
    <Modal as="form" show={!!show} onSubmit={onSubmit}>
      <ModalHeader subTitle="Edit join date for this candidate" onClose={onClose}>
        Edit Join Date
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
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditJoinDateModal
