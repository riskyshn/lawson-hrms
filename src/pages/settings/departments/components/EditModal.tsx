import MainModal from '@/components/Elements/Modals/MainModal'
import { organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type EditModalProps = {
  item?: IDepartment | null
  onClose?: () => void
  onUpdated?: (item: IDepartment) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  code: yup.string().required().label('Code'),
})

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (item) {
      setIsLoading(false)
      setErrorMessage('')
      setValue('name', item.name || '')
      setValue('code', item.code || '')
    }
  }, [item, setValue])

  const onSubmit = handleSubmit(async (data) => {
    if (!item) return

    try {
      setIsLoading(true)
      setErrorMessage('')

      const updatedItem = await organizationService.updateDepartment(item.oid, data)
      onUpdated?.(updatedItem)
      toast('Department updated successfully', { color: 'success' })

      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <MainModal className="max-w-xl" show={!!item}>
      <h4 className="mb-4 text-2xl font-semibold">Update Department</h4>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}

        <Input label="Name" labelRequired error={errors.name?.message} {...register('name')} />
        <Input label="Code" labelRequired error={errors.code?.message} {...register('code')} />

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
