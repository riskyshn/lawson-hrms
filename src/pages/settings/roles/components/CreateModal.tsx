import { authorityService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, Textarea, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type CreateModalProps = {
  show: boolean
  onClose?: () => void
  onCreated?: (role: IRole) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  code: yup.string().required().label('Code'),
  description: yup.string().required().label('Description'),
})

const CreateModal: React.FC<CreateModalProps> = ({ show, onClose, onCreated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
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
    <Modal as="form" show={show} onSubmit={onSubmit}>
      <ModalHeader subTitle="Set up a new role for your company" onClose={onClose}>
        Create Role
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input label="Name" labelRequired error={errors.name?.message} {...register('name')} />
        <Input label="Code" labelRequired error={errors.code?.message} {...register('code')} />
        <Textarea label="Description" labelRequired rows={6} error={errors.description?.message} {...register('description')} />
      </div>
      <ModalFooter>
        <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
          Next
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
