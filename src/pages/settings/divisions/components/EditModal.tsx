import type { IDepartment } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, useRemember, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import { organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils'
import getEditModalSubtitle from '../../utils/get-edit-modal-subtitle'

type EditModalProps = {
  item?: IDepartment | null
  onClose?: () => void
  onUpdated?: (item: IDepartment) => void
}

const schema = yup.object().shape({
  code: yup.string().required().label('Code'),
  name: yup.string().required().label('Name'),
})

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const rItem = useRemember(item)
  const toast = useToast()

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
    <Modal as="form" onSubmit={onSubmit} show={!!item}>
      <ModalHeader onClose={onClose} subTitle={getEditModalSubtitle(rItem)}>
        Edit Department
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input error={errors.name?.message} label="Name" labelRequired {...register('name')} />
        <Input error={errors.code?.message} label="Code" labelRequired {...register('code')} />
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