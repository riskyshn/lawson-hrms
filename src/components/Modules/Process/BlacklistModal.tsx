import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { candidateService, masterService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { yupResolver } from '@hookform/resolvers/yup'
import { AsyncSelect, Button, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type BlacklistModalProps = {
  applicantId?: string
  onClose?: () => void
  onRefresh?: () => void
  show?: boolean
}

const schema = yup.object().shape({ reason: YUP_OPTION_OBJECT.required().label('Reason') })

const BlacklistModal: React.FC<BlacklistModalProps> = ({ applicantId, onClose, onRefresh, show }) => {
  const [loading, setLoading] = useState(false)
  const toast = useToast()

  const {
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      await candidateService.createBlacklist({
        applicantId,
        blacklistReason: data.reason.label,
        blacklistReasonId: data.reason.value,
      })
      onRefresh?.()
      onClose?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  })

  return (
    <Modal as="form" show={!!show} onSubmit={onSubmit}>
      <ModalHeader subTitle="Please select the reason of why this candidate is Blacklist" onClose={onClose}>
        Blacklist
      </ModalHeader>

      <div className="p-3">
        <AsyncSelect
          className="mb-3"
          label="Select Reason"
          labelRequired
          action={masterService.fetchReasons}
          params={{ type: 'blacklist' }}
          placeholder="Underqualified, Salary Expectation Too High"
          converter={emmbedToOptions}
          error={errors.reason?.message}
          value={getValues('reason')}
          disableInfiniteScroll
          onValueChange={(v) => {
            setValue('reason', v)
            trigger('reason')
          }}
        />
      </div>

      <ModalFooter>
        <Button type="button" className="w-24" color="error" variant="light" disabled={loading} onClick={onClose}>
          Close
        </Button>
        <Button type="submit" className="w-24" color="primary" disabled={loading} loading={loading}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default BlacklistModal
