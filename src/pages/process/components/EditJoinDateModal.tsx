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
  applicant?: IDataTableApplicant
  onClose?: () => void
  onUpdated?: () => void
  show?: boolean
}

const EditJoinDateModal: React.FC<PropTypes> = ({ applicant, onClose, onUpdated, show }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
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
        joinDate: moment.utc(joinDate).local().format('YYYY-MM-DD'),
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
    <Modal as="form" onSubmit={onSubmit} show={!!show}>
      <ModalHeader onClose={onClose} subTitle="Edit join date for this candidate">
        Edit Join Date
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
          Save Changes
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditJoinDateModal
