import AsyncSelect from '@/components/Elements/Forms/AsyncSelect'
import useRemember from '@/hooks/use-remember'
import { masterService, organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, InputWrapper, Modal, ModalFooter, ModalHeader, Textarea, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import getEditModalSubtitle from '../../utils/get-edit-modal-subtitle'
import GeoPicker from './GeoPicker'

type EditModalProps = {
  item?: IBranch | null
  onClose?: () => void
  onUpdated?: (item: IBranch) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Name'),
  address: yup.string().required().label('Address'),
  longlat: yup.string().required().label('Longlat'),
  range: yup
    .number()
    .transform((value) => (isNaN(value) ? undefined : value))
    .required()
    .label('Range'),
  cityId: yup.string().label('City'),
})

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')

  const rItem = useRemember(item)
  const toast = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (item) {
      setIsLoading(false)
      setErrorMessage('')
      setValue('name', item.name || '')
      setValue('address', item.address || '')
      if (item.coordinate) setValue('longlat', `${item.coordinate.coordinates[1]},${item.coordinate.coordinates[0]}`)
      else setValue('longlat', '')
      if (item.range) setValue('range', item.range)
      else setValue('range', 0)
      setValue('cityId', item.city?.oid || '')
      trigger()
    }
  }, [item, setValue, trigger])

  const onSubmit = handleSubmit(async (data) => {
    if (!item) return

    try {
      setIsLoading(true)
      setErrorMessage('')

      const updatedItem = await organizationService.updateBranch(item.oid, data)
      onUpdated?.(updatedItem)
      toast('Branch updated successfully', { color: 'success' })

      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" show={!!item} onSubmit={onSubmit}>
      <ModalHeader onClose={onClose} subTitle={getEditModalSubtitle(rItem)}>
        Update Branch
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input label="Name" placeholder="Branch name" labelRequired error={errors.name?.message} {...register('name')} />
        <Textarea label="Address" placeholder="Branch address here..." labelRequired rows={3} {...register('address')} />
        <AsyncSelect
          label="City"
          labelRequired
          placeholder="Choose City"
          fetcher={masterService.fetchCities}
          converter={(data: any) => data.map((el: any) => ({ label: `${el.name}`, value: el.oid }))}
          name="cityId"
          error={errors.cityId?.message}
          initialOptions={item?.city ? [{ label: `${item.city.name}`, value: item.city.oid }] : []}
          value={getValues('cityId')}
          onChange={(v) => {
            setValue('cityId', v.toString())
            trigger('cityId')
          }}
        />
        <InputWrapper label="Longlat" labelRequired error={errors.longlat?.message}>
          <GeoPicker
            error={errors.longlat?.message}
            value={getValues('longlat')}
            onValueChange={(v) => {
              setValue('longlat', v)
              trigger('longlat')
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
          Update
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditModal
