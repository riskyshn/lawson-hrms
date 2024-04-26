import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { masterService, organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { yupResolver } from '@hookform/resolvers/yup'
import {
  Alert,
  AsyncSelect,
  BaseInput,
  Button,
  Input,
  InputWrapper,
  Modal,
  ModalFooter,
  ModalHeader,
  Textarea,
  useToast,
} from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import GeoPicker from './GeoPicker'

type CreateModalProps = {
  show: boolean
  onClose?: () => void
  onCreated?: (item: IBranch) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  address: yup.string().required().label('Address'),
  latLng: yup.string().required().label('LatLng'),
  range: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Range'),
  city: YUP_OPTION_OBJECT.label('City'),
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
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async ({ latLng, city, ...data }) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const [lat, lng] = latLng.split(',')
      const createdItem = await organizationService.createBranch({
        ...data,
        longlat: `${lng.trim()}, ${lat.trim()}`,
        cityId: city.value,
      })
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

  const city = watch('city.label')

  return (
    <Modal as="form" show={show} onSubmit={onSubmit}>
      <ModalHeader subTitle="Set up a new branch for your company" onClose={onClose}>
        Create Branch
      </ModalHeader>

      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input label="Name" placeholder="Branch name" labelRequired error={errors.name?.message} {...register('name')} />
        <Textarea
          label="Address"
          placeholder="Branch address here..."
          labelRequired
          error={errors.address?.message}
          rows={3}
          {...register('address')}
        />
        <AsyncSelect
          label="City"
          labelRequired
          placeholder="Choose City"
          action={masterService.fetchCities}
          converter={emmbedToOptions}
          name="city"
          error={errors.city?.message}
          value={getValues('city')}
          onChange={(v) => {
            setValue('city', v)
            trigger('city')
          }}
        />
        <InputWrapper label="LatLng" labelRequired error={errors.latLng?.message} help={!city && 'Pleace select a city before.'}>
          <BaseInput className="mb-3" error={errors.latLng?.message} {...register('latLng')} />
          <GeoPicker
            error={errors.latLng?.message}
            value={watch('latLng')}
            city={city}
            onValueChange={(v) => {
              setValue('latLng', v)
              trigger('latLng')
            }}
          />
        </InputWrapper>
        <Input label="Range" placeholder="Map location range" labelRequired {...register('range')} type="number" />
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
