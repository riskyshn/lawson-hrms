import { employeeService } from '@/services'
import { useOrganizationStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Modal, ModalFooter, ModalHeader, Select, Textarea, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type ModalProps = {
  item: IDataTableEmployee | null
  onClose: () => void
  onSuccess: () => void
}

const schema = yup.object().shape({
  jobTypeId: yup.string().required().label('Employment status'),
  reason: yup.string(),
})

const ResignTerminateModal: React.FC<ModalProps> = ({ item, onSuccess, onClose }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const {
    master: { jobTypes },
  } = useOrganizationStore()

  const {
    register,
    getValues,
    setValue,
    trigger,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
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
      await employeeService.setInactiveEmployee(item.oid, data)
      toast('Employee status updated successfully', { color: 'success' })
      onSuccess()
    } catch (error) {
      setErrorMessage(axiosErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" show={!!item} onSubmit={onSubmit}>
      <ModalHeader subTitle="Please select the reason of why this candidate is set as previous employee" onClose={onClose}>
        Select Reason
      </ModalHeader>

      <div className="grid grid-cols-1 gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Select
          label="Select Status"
          labelRequired
          placeholder="Status"
          hideSearch
          name="jobTypeId"
          error={errors.jobTypeId?.message}
          value={getValues('jobTypeId')}
          onChange={(v) => {
            setValue('jobTypeId', v.toString())
            trigger('jobTypeId')
          }}
          options={jobTypes
            .filter((el) => el.status === 2)
            .map((el) => ({
              label: el.name || '',
              value: el.oid,
            }))}
        />

        <Textarea
          label="Reason"
          error={errors.reason?.message}
          help={`${watch('reason')?.length || 0}/50`}
          rows={3}
          maxLength={50}
          {...register('reason')}
        />
      </div>

      <ModalFooter className="gap-3">
        <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default ResignTerminateModal
