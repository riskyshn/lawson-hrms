import MainModal from '@/components/Elements/MainModal'
import { authorityService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Textarea, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type EditModalProps = {
  role?: IRole | null
  onClose?: () => void
  onUpdated?: (role: IRole) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Role Name'),
  code: yup.string().required().label('Code'),
  description: yup.string().required().label('Description'),
})

const EditModal: React.FC<EditModalProps> = ({ role, onClose, onUpdated }) => {
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
    <MainModal className="max-w-xl" show={!!role}>
      <h4 className="mb-4 text-2xl font-semibold">Update Role</h4>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}

        <Input label="Role Name" labelRequired error={errors.name?.message} {...register('name')} />
        <Input label="Code" labelRequired error={errors.code?.message} {...register('code')} />
        <Textarea label="Description" labelRequired rows={6} error={errors.description?.message} {...register('description')} />

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
