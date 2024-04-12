import AsyncSelect from '@/components/Elements/Forms/AsyncSelect'
import { masterService, organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, InputWrapper, Modal, ModalFooter, ModalHeader, Textarea, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import GeoPicker from './GeoPicker'
import { useMasterStore } from '@/store'
import useRemember from '@/hooks/use-remember'

type CreateModalProps = {
  show: boolean
  onClose?: () => void
  onCreated?: (item: IBranch) => void
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

const CreateModal: React.FC<CreateModalProps> = ({ show, onClose, onCreated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const { cities } = useMasterStore().area

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

  const city = useRemember(cities.find((el) => el.oid === getValues('cityId')))

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
        <InputWrapper label="Longlat" labelRequired error={errors.longlat?.message} help={!city && 'Pleace select a city before.'}>
          <GeoPicker
            error={errors.longlat?.message}
            value={getValues('longlat')}
            city={city?.name}
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
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
