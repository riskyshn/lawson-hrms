import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import { authorityService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

type CreateModalProps = {
  onClose?: () => void
  onCreated?: (permission: IPermission) => void
  show: boolean
}

const schema = yup.object().shape({
  apiId: yup.string().required().label('Api ID'),
  groupName: yup.string().required().label('Group Name'),
  method: yup.string().required().label('Method'),
  name: yup.string().required().label('Name'),
  path: yup.string().required().label('Path'),
  region: yup.string().required().label('Region'),
  stage: yup.string().required().label('Stage'),
})

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onCreated, show }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      apiId: '-',
      region: 'ap-southeast-3',
      stage: 'prod',
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const payload = {
        arn: {
          apiId: data.apiId,
          region: data.region,
          stage: data.stage,
        },
        groupName: data.groupName,
        method: data.method,
        name: data.name,
        path: data.path,
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
    <Modal as="form" onSubmit={onSubmit} show={show}>
      <ModalHeader onClose={onClose} subTitle="Set up a new permission for your company">
        Create Permission
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input error={errors.name?.message} label="Name" labelRequired {...register('name')} />
        <Input error={errors.groupName?.message} label="Group Name" labelRequired {...register('groupName')} />
        <Input error={errors.path?.message} label="Path" labelRequired {...register('path')} />

        <Select
          error={errors.method?.message}
          label="Method"
          labelRequired
          name="method"
          onChange={(v) => {
            setValue('method', v.toString())
            trigger('method')
          }}
          options={['*', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map((el) => ({ label: el, value: el }))}
          placeholder="Choose Method"
          value={getValues('method')}
        />

        <Input error={errors.apiId?.message} label="Api ID" labelRequired {...register('apiId')} />
        <Input error={errors.region?.message} label="Region" labelRequired {...register('region')} />
        <Input error={errors.stage?.message} label="Stage" labelRequired {...register('stage')} />
      </div>

      <ModalFooter>
        <Button className="w-24" color="error" disabled={isLoading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="w-24" color="primary" disabled={isLoading} loading={isLoading} type="submit">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
