import type { IWorkplacement } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, useRemember, useToast } from '@jshrms/ui'
import * as yup from 'yup'
import { organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import getEditModalSubtitle from '../../utils/get-edit-modal-subtitle'

type EditModalProps = {
  item?: IWorkplacement | null
  onClose?: () => void
  onUpdated?: (item: IWorkplacement) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
})

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const toast = useToast()
  const rItem = useRemember(item)

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
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

      const updatedItem = await organizationService.updateWorkplacement(item.oid, data)
      onUpdated?.(updatedItem)
      toast('Work Placement updated successfully', { color: 'success' })

      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" onSubmit={onSubmit} show={!!item}>
      <ModalHeader onClose={onClose} subTitle={getEditModalSubtitle(rItem)}>
        Update Work Placement
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input error={errors.name?.message} label="Name" labelRequired {...register('name')} />
      </div>
      <ModalFooter>
        <Button className="w-24" color="error" disabled={isLoading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="w-24" color="primary" disabled={isLoading} loading={isLoading} type="submit">
          Update
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditModal
