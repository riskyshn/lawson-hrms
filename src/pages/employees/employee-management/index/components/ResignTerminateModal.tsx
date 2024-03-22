import MainModal from '@/components/Elements/MainModal'
import { employeeService } from '@/services'
import { useOrganizationStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Select, Textarea, useToast } from 'jobseeker-ui'
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
    <MainModal className="max-w-xl py-12" show={!!item} onClose={onClose}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="mb-2">
          <h4 className="mb-2 text-center text-2xl font-semibold">Select Reason</h4>
          <p className="text-center">Please select the reason of why this employee is resigned/terminated</p>
        </div>

        {errorMessage && <Alert color="error">{errorMessage}</Alert>}

        <Select
          label="Employment Status"
          labelRequired
          placeholder="Resign/Terminated"
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

        <Textarea label="Reason" rows={3} error={errors.reason?.message} {...register('reason')} />

        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default ResignTerminateModal
