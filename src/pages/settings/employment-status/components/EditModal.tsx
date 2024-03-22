import MainModal from '@/components/Elements/MainModal'
import { organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Select, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type EditModalProps = {
  item?: IJobType | null
  onClose?: () => void
  onUpdated?: (item: IJobType) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  status: yup.number().required().label('Status for employment'),
})

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (item) {
      setIsLoading(false)
      setErrorMessage('')
      setValue('name', item.name || '')
      setValue('status', item.status || 0)
    }
  }, [item, setValue])

  const onSubmit = handleSubmit(async (data) => {
    if (!item) return

    try {
      setIsLoading(true)
      setErrorMessage('')

      const updatedItem = await organizationService.updateJobType(item.oid, data)
      onUpdated?.(updatedItem)
      toast('Employment Status updated successfully', { color: 'success' })

      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <MainModal className="max-w-xl" show={!!item}>
      <h4 className="mb-4 text-2xl font-semibold">Update Employment Status</h4>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}

        <Input label="Name" labelRequired error={errors.name?.message} {...register('name')} />

        <Select
          label="Status for employment"
          labelRequired
          options={[
            { label: 'Active', value: 1 },
            { label: 'Inactive', value: 2 },
          ]}
          hideSearch
          name="status"
          error={errors.status?.message}
          value={getValues('status')}
          onChange={(v) => {
            setValue('status', Number(v))
            trigger('status')
          }}
        />

        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
            Update
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default EditModal
