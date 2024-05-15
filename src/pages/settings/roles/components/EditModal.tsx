import type { IRole } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, Textarea, useRemember, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import { authorityService } from '@/services'
import { axiosErrorMessage } from '@/utils'
import getEditModalSubtitle from '../../utils/get-edit-modal-subtitle'

type EditModalProps = {
  onClose?: () => void
  onUpdated?: (role: IRole) => void
  role?: IRole | null
}

const schema = yup.object().shape({
  code: yup.string().required().label('Code'),
  description: yup.string().required().label('Description'),
  name: yup.string().required().label('Name'),
})

const EditModal: React.FC<EditModalProps> = ({ onClose, onUpdated, role }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const toast = useToast()
  const rItem = useRemember(role)

  const {
    formState: { errors },
    handleSubmit,
    register,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (role) {
      setIsLoading(false)
      setErrorMessage('')
      setValue('name', role.name)
      setValue('code', role.code)
      setValue('description', role.description)
    }
  }, [role, setValue])

  const onSubmit = handleSubmit(async (data) => {
    if (!role) return

    try {
      setIsLoading(true)
      setErrorMessage('')

      const newRole = await authorityService.updateRole(role.oid, {
        ...data,
        attachedPermissions: role.attachedPolicies.map((el) => el.oid),
      })
      onUpdated?.(newRole)
      toast('Role updated successfully', { color: 'success' })

      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" onSubmit={onSubmit} show={!!role}>
      <ModalHeader onClose={onClose} subTitle={getEditModalSubtitle(rItem)}>
        Update Role
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input error={errors.name?.message} label="Name" labelRequired {...register('name')} />
        <Input error={errors.code?.message} label="Code" labelRequired {...register('code')} />
        <Textarea error={errors.description?.message} label="Description" labelRequired rows={6} {...register('description')} />
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
