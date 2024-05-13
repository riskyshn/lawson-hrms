import type { IBranch } from '@/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
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
import * as yup from 'yup'
import { masterService, organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import emmbedToOptions from '@/utils/emmbed-to-options'
import genYupOption from '@/utils/gen-yup-option'
import yupOptionError from '@/utils/yup-option-error'
import GeoPicker from './GeoPicker'

type CreateModalProps = {
  onClose?: () => void
  onCreated?: (item: IBranch) => void
  show: boolean
}

const schema = yup.object().shape({
  address: yup.string().required().label('Address'),
  city: genYupOption('City').required(),
  latLng: yup.string().required().label('LatLng'),
  name: yup.string().required().label('Name'),
  range: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Range'),
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
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async ({ city, latLng, ...data }) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const [lat, lng] = latLng.split(',')
      const createdItem = await organizationService.createBranch({
        ...data,
        cityId: city.value,
        longlat: `${lng.trim()}, ${lat.trim()}`,
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
    <Modal as="form" onSubmit={onSubmit} show={show}>
      <ModalHeader onClose={onClose} subTitle="Set up a new branch for your company">
        Create Branch
      </ModalHeader>

      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input error={errors.name?.message} label="Name" labelRequired placeholder="Branch name" {...register('name')} />
        <Textarea
          error={errors.address?.message}
          label="Address"
          labelRequired
          placeholder="Branch address here..."
          rows={3}
          {...register('address')}
        />
        <AsyncSelect
          action={masterService.fetchCities}
          converter={emmbedToOptions}
          error={yupOptionError(errors.city)}
          label="City"
          labelRequired
          name="city"
          onChange={(v) => {
            setValue('city', v)
            trigger('city')
          }}
          placeholder="Choose City"
          value={getValues('city')}
        />
        <InputWrapper error={errors.latLng?.message} help={!city && 'Pleace select a city before.'} label="LatLng" labelRequired>
          <BaseInput className="mb-3" error={errors.latLng?.message} {...register('latLng')} />
          <GeoPicker
            city={city}
            error={errors.latLng?.message}
            onValueChange={(v) => {
              setValue('latLng', v)
              trigger('latLng')
            }}
            value={watch('latLng')}
          />
        </InputWrapper>
        <Input label="Range" labelRequired placeholder="Map location range" {...register('range')} type="number" />
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
