import AsyncSelect from '@/components/Elements/Forms/AsyncSelect'
import MainModal from '@/components/Elements/Modals/MainModal'
import { masterService, organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Textarea, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type CreateModalProps = {
  show: boolean
  onClose?: () => void
  onCreated?: (item: IBranch) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  address: yup.string().required().label('Address'),
  longlat: yup.string().required().label('Longitude-Latitude'),
  range: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Range'),
  cityId: yup.string().label('City'),
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

      const createdItem = await organizationService.createBranch(data)
      onCreated?.(createdItem)
      toast('Branch created successfully', { color: 'success' })

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
        <h4 className="mb-4 text-2xl font-semibold">Create Branch</h4>

        {errorMessage && <Alert color="error">{errorMessage}</Alert>}

        <Input label="Name" labelRequired error={errors.name?.message} {...register('name')} />
        <Textarea rows={3} label="Address" labelRequired {...register('address')} />
        <Input label="Longitude-Latitude" labelRequired {...register('longlat')} />
        <Input label="Range" labelRequired {...register('range')} type="number" />
        <AsyncSelect
          label="City"
          labelRequired
          placeholder="Choose City"
          fetcher={masterService.fetchCities}
          converter={(data: any) => data.map((el: any) => ({ label: `${el.name}, ${el.province}`, value: el.oid }))}
          name="cityId"
          error={errors.cityId?.message}
          value={getValues('cityId')}
          onChange={(v) => {
            setValue('cityId', v.toString())
            trigger('cityId')
          }}
        />

        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default CreateModal
