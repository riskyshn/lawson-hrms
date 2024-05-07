import React, { useEffect, useState } from 'react'
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
  useRemember,
  useToast,
} from 'jobseeker-ui'
import * as yup from 'yup'
import { YUP_OPTION_OBJECT } from '@/constants/globals'
import { masterService, organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import emmbedToOptions from '@/utils/emmbed-to-options'
import getEditModalSubtitle from '../../utils/get-edit-modal-subtitle'
import GeoPicker from './GeoPicker'

type EditModalProps = {
  item?: IBranch | null
  onClose?: () => void
  onUpdated?: (item: IBranch) => void
}

const schema = yup.object().shape({
  address: yup.string().required().label('Address'),
  city: YUP_OPTION_OBJECT.label('City'),
  latLng: yup.string().required().label('LatLng'),
  name: yup.string().required().label('Name'),
  range: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Range'),
})

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const rItem = useRemember(item)
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
    watch,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (item) {
      setIsLoading(false)
      setErrorMessage('')
      setValue('name', item.name || '')
      setValue('address', item.address || '')
      if (item.coordinate) setValue('latLng', `${item?.coordinate?.coordinates?.[0]},${item?.coordinate?.coordinates?.[1]}`)
      else setValue('latLng', '')
      if (item.range) setValue('range', item.range)
      else setValue('range', 0)
      // @ts-expect-error
      setValue('city', item.city)
      trigger()
    }
  }, [item, setValue, trigger])

  const onSubmit = handleSubmit(async ({ city, latLng, ...data }) => {
    if (!item) return
    try {
      setIsLoading(true)
      setErrorMessage('')

      const [lat, lng] = latLng.split(',')
      const updatedItem = await organizationService.updateBranch(item.oid, {
        ...data,
        cityId: city.value,
        longlat: `${lng.trim()}, ${lat.trim()}`,
      })
      onUpdated?.(updatedItem)
      toast('Branch updated successfully', { color: 'success' })

      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  const city = watch('city.label')

  return (
    <Modal as="form" onSubmit={onSubmit} show={!!item}>
      <ModalHeader onClose={onClose} subTitle={getEditModalSubtitle(rItem)}>
        Update Branch
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input error={errors.name?.message} label="Name" labelRequired placeholder="Branch name" {...register('name')} />
        <Textarea label="Address" labelRequired placeholder="Branch address here..." rows={3} {...register('address')} />
        <AsyncSelect
          action={masterService.fetchCities}
          converter={emmbedToOptions}
          error={errors.city?.message}
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
          Update
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditModal
