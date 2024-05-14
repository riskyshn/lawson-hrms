import type { IDataTableEmployee } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, AsyncSelect, Button, Modal, ModalFooter, ModalHeader, Textarea, useToast } from '@jshrms/ui'
import * as yup from 'yup'
import { employeeService, organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import emmbedToOptions from '@/utils/emmbed-to-options'
import genYupOption from '@/utils/gen-yup-option'
import yupOptionError from '@/utils/yup-option-error'

type ModalProps = {
  item: IDataTableEmployee | null
  onClose: () => void
  onSuccess: () => void
}

const schema = yup.object().shape({
  jobType: genYupOption('Employment status').required(),
  reason: yup.string().required(),
})

const ResignTerminateModal: React.FC<ModalProps> = ({ item, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (item) reset()
  }, [item, reset])

  const onSubmit = handleSubmit(async (data) => {
    if (!item) return

    try {
      setIsLoading(true)
      setErrorMessage('')
      await employeeService.setInactiveEmployee(item.oid, { jobTypeId: data.jobType.value, reason: data.reason })
      toast('Employee status updated successfully', { color: 'success' })
      onSuccess()
    } catch (error) {
      setErrorMessage(axiosErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" onSubmit={onSubmit} show={!!item}>
      <ModalHeader onClose={onClose} subTitle="Please select the reason of why this candidate is set as previous employee">
        Select Reason
      </ModalHeader>

      <div className="grid grid-cols-1 gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <AsyncSelect
          action={organizationService.fetchJobTypes}
          converter={emmbedToOptions}
          error={yupOptionError(errors.jobType)}
          hideSearch
          label="Select Status"
          labelRequired
          name="jobType"
          onValueChange={(v) => {
            setValue('jobType', v)
            trigger('jobType')
          }}
          params={{ status: 2 }}
          placeholder="Status"
          value={getValues('jobType')}
        />

        <Textarea
          error={errors.reason?.message}
          help={`${watch('reason')?.length || 0}/50`}
          label="Reason"
          labelRequired
          maxLength={50}
          rows={3}
          {...register('reason')}
        />
      </div>

      <ModalFooter className="gap-3">
        <Button className="w-24" color="error" disabled={isLoading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="w-24" color="primary" disabled={isLoading} loading={isLoading} type="submit">
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ResignTerminateModal
