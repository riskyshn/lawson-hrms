import MainModal from '@/components/Elements/MainModal'
import { authorityService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Textarea, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type CreateOrUpdateModalProps = {
  show: boolean
  role?: IRole
  onClose: () => void
  onCreated?: (role: IRole) => void
  onUpdated?: (role: IRole) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Role Name'),
  code: yup.string().required().label('Code'),
  description: yup.string().required().label('Description'),
})

const CreateOrUpdateModal: React.FC<CreateOrUpdateModalProps> = ({ role, show, onClose, onCreated, onUpdated }) => {
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
    setValue('name', role?.name || '')
    setValue('code', role?.code || '')
    setValue('description', role?.description || '')
  }, [role, setValue])

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      if (role) {
        const newRole = await authorityService.updateRole(role.oid, {
          ...data,
          attachedPermissions: role.attachedPolicies.map((el) => el.oid),
        })
        onUpdated?.(newRole)
        toast('Role updated successfully', { color: 'success', position: 'top-right' })
      } else {
        const newRole = await authorityService.createRole({ ...data, attachedPermissions: [] })
        onCreated?.(newRole)
        toast('Role created successfully', { color: 'success', position: 'top-right' })
      }

      onClose()
    } catch (error: any) {
      setErrorMessage(axiosErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <MainModal className="max-w-xl" show={show} onClose={onClose}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <h4 className="mb-4 text-2xl font-semibold">{role ? 'Update Role' : 'Create Role'}</h4>

        {errorMessage && <Alert color="error">{errorMessage}</Alert>}

        <Input label="Role Name" labelRequired error={errors.name?.message} {...register('name')} />
        <Input label="Code" labelRequired error={errors.code?.message} {...register('code')} />
        <Textarea label="Description" labelRequired rows={6} error={errors.description?.message} {...register('description')} />

        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" onClick={onClose} color="primary" variant="light">
            Cancel
          </Button>
          <Button type="submit" color="primary" disabled={isLoading} loading={isLoading}>
            {role ? 'Update' : 'Create'}
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default CreateOrUpdateModal
