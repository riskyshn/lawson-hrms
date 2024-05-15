import type { IJobType } from '@/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, Select, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import { organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils'

type CreateModalProps = {
  onClose?: () => void
  onCreated?: (item: IJobType) => void
  show: boolean
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  status: yup.number().required().label('Status for employment'),
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
    <Modal as="form" onSubmit={onSubmit} show={show}>
      <ModalHeader onClose={onClose} subTitle="Set up a new employment status for your company">
        Create Employment Status
      </ModalHeader>

      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input error={errors.name?.message} label="Name" labelRequired {...register('name')} />
        <Select
          error={errors.status?.message}
          hideSearch
          label="Status for employment"
          labelRequired
          name="status"
          onChange={(v) => {
            setValue('status', Number(v))
            trigger('status')
          }}
          options={[
            { label: 'Active', value: '1' },
            { label: 'Inactive', value: '2' },
          ]}
          value={String(getValues('status'))}
        />
      </div>

      <ModalFooter>
        <Button className="w-24" color="error" disabled={isLoading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="w-24" color="primary" disabled={isLoading} loading={isLoading} type="submit">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
