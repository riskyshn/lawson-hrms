import MainModal from '@/components/Elements/MainModal'
import { authorityService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Select, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type CreateModalProps = {
  show: boolean
  onClose?: () => void
  onCreated?: (permission: IPermission) => void
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

const CreateModal: React.FC<CreateModalProps> = ({ show, onClose, onCreated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      apiId: '-',
      region: 'ap-southeast-3',
      stage: 'prod',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
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

      const newPermission = await authorityService.createPermission(payload)
      onCreated?.(newPermission)
      toast('Permission created successfully', { color: 'success' })

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
    <MainModal className="max-w-xl" show={show}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <h4 className="mb-4 text-2xl font-semibold">Create Permission</h4>

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

        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
            Create
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default CreateModal
