import type { IRole } from '@/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, Textarea, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import { authorityService } from '@/services'
import { axiosErrorMessage } from '@/utils'

type CreateModalProps = {
  onClose?: () => void
  onCreated?: (role: IRole) => void
  show: boolean
}

const schema = yup.object().shape({
  code: yup.string().required().label('Code'),
  description: yup.string().required().label('Description'),
  name: yup.string().required().label('Name'),
})

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onCreated, show }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const newRole = await authorityService.createRole({ ...data, attachedPermissions: [] })
      onCreated?.(newRole)
      toast('Role created successfully', { color: 'success' })

      onClose?.()
      setTimeout(() => {
        reset()
        setIsLoading(false)
      }, 500)
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" onSubmit={onSubmit} show={show}>
      <ModalHeader onClose={onClose} subTitle="Set up a new role for your company">
        Create Role
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
          Next
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
