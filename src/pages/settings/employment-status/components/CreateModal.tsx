import { organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type CreateModalProps = {
  show: boolean
  onClose?: () => void
  onCreated?: (item: IJobType) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  status: yup.number().required().label('Status for employment'),
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
  })

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const createdItem = await organizationService.createJobType(data)
      onCreated?.(createdItem)
      toast('Employment Status created successfully', { color: 'success' })

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
      <ModalHeader subTitle="Set up a new employment status for your company" onClose={onClose}>
        Create Employment Status
      </ModalHeader>

      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input label="Name" labelRequired error={errors.name?.message} {...register('name')} />
        <Select
          label="Status for employment"
          labelRequired
          options={[
            { label: 'Active', value: '1' },
            { label: 'Inactive', value: '2' },
          ]}
          hideSearch
          name="status"
          error={errors.status?.message}
          value={String(getValues('status'))}
          onChange={(v) => {
            setValue('status', Number(v))
            trigger('status')
          }}
        />
      </div>

      <ModalFooter>
        <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
