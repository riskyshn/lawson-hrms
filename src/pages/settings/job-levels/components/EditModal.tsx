import useRemember from '@/hooks/use-remember'
import { organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import getEditModalSubtitle from '../../utils/get-edit-modal-subtitle'

type EditModalProps = {
  item?: IJobLevel | null
  onClose?: () => void
  onUpdated?: (item: IJobLevel) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
})

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const rItem = useRemember(item)
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
    }
  }, [item, setValue])

  const onSubmit = handleSubmit(async (data) => {
    if (!item) return

    try {
      setIsLoading(true)
      setErrorMessage('')

      const updatedItem = await organizationService.updateJobLevel(item.oid, data)
      onUpdated?.(updatedItem)
      toast('Job Level updated successfully', { color: 'success' })

      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" show={!!item} onSubmit={onSubmit}>
      <ModalHeader subTitle={getEditModalSubtitle(rItem)} onClose={onClose}>
        Update Job Level
      </ModalHeader>

      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input label="Name" labelRequired error={errors.name?.message} {...register('name')} />
      </div>

      <ModalFooter>
        <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditModal
