import { authorityService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type EditModalProps = {
  permission?: IPermission | null
  onClose?: () => void
  onUpdated?: (permission: IPermission) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  groupName: yup.string().required().label('Group Name'),
  method: yup.string().required().label('Method'),
  path: yup.string().required().label('Path'),
  apiId: yup.string().required().label('Api ID'),
  region: yup.string().required().label('Region'),
  stage: yup.string().required().label('Stage'),
})

const EditModal: React.FC<EditModalProps> = ({ permission, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const toast = useToast()

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (permission) {
      setIsLoading(false)
      setErrorMessage('')
      setValue('name', permission.name)
      setValue('groupName', permission.groupName)
      setValue('method', permission.method)
      setValue('path', permission.path)
      setValue('apiId', permission.arn.apiId)
      setValue('region', permission.arn.region)
      setValue('stage', permission.arn.stage)
    }
  }, [permission, setValue])

  const onSubmit = handleSubmit(async (data) => {
    if (!permission) return

    try {
      setIsLoading(true)
      setErrorMessage('')

      const payload = {
        groupName: data.groupName,
        name: data.name,
        method: data.method,
        path: data.path,
        arn: {
          apiId: data.apiId,
          region: data.region,
          stage: data.stage,
        },
      }

      const newPermission = await authorityService.updatePermission(permission.oid, payload)
      onUpdated?.(newPermission)
      toast('Permission updated successfully', { color: 'success' })

      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" show={!!permission} onSubmit={onSubmit}>
      <ModalHeader onClose={onClose}>Update Permission</ModalHeader>

      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}

        <Input label="Name" labelRequired error={errors.name?.message} {...register('name')} />
        <Input label="Group Name" labelRequired error={errors.groupName?.message} {...register('groupName')} />
        <Input label="Path" labelRequired error={errors.path?.message} {...register('path')} />

        <Select
          label="Method"
          labelRequired
          placeholder="Choose Method"
          name="method"
          options={['*', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((el) => ({ label: el, value: el }))}
          error={errors.method?.message}
          value={getValues('method')}
          onChange={(v) => {
            setValue('method', v.toString())
            trigger('method')
          }}
        />

        <Input label="Api ID" labelRequired error={errors.apiId?.message} {...register('apiId')} />
        <Input label="Region" labelRequired error={errors.region?.message} {...register('region')} />
        <Input label="Stage" labelRequired error={errors.stage?.message} {...register('stage')} />
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
