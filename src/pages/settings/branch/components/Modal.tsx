import React, { useState } from 'react'
import { Button, Input, Textarea, useToast } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { axiosErrorMessage } from '@/utils/axios'
import { masterService, organizationService } from '@/services'
import AsyncSelect from '@/components/Elements/AsyncSelect'
import { useMasterStore } from '@/store'

type ModalProps = {
  show: boolean
  onClose: () => void
  branch?: any
  onSubmitSuccess: () => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Branch Name'),
  address: yup.string().required().label('Address'),
  longitudeLatitude: yup.string().required().label('Longitude-Latitude'),
  range: yup.string().required().label('Range'),
  cityId: yup.string().label('City Id'),
})

const Modal: React.FC<ModalProps> = ({ show, onClose, branch, onSubmitSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()
  const masterStore = useMasterStore()
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: branch?.name || '',
      address: branch?.address || '',
      longitudeLatitude: '',
      range: '',
      cityId: branch?.cityId || '',
    },
  })

  const initialCity = masterStore.area.cities.find((el) => el.oid === getValues('cityId'))

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      if (branch) {
        await organizationService.updateBranch(branch.oid, data)
        toast('Branch updated successfully', { color: 'success', position: 'top-right' })
      } else {
        await organizationService.createBranch(data)
        toast('Branch created successfully', { color: 'success', position: 'top-right' })
      }

      onSubmitSuccess()
      onClose()
    } catch (error) {
      setErrorMessage(axiosErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="mb-4">
          <h4 className="mb-2 text-2xl font-semibold">{branch ? 'Update Branch' : 'Add Branch'}</h4>
        </div>
        <Input label="Branch Name*" {...register('name')} />
        <Textarea rows={3} label="Address*" {...register('address')} />
        <Input label="Longitude-Latitude*" {...register('longitudeLatitude')} />
        <Input label="Range*" {...register('range')} />
        <AsyncSelect
          label="City"
          labelRequired
          placeholder="Choose City"
          fetcher={masterService.fetchCities}
          converter={(data: any) => data.map((el: any) => ({ label: `${el.name}, ${el.province}`, value: el.oid }))}
          name="cityId"
          error={errors.cityId?.message}
          value={getValues('cityId')}
          initialOptions={initialCity ? [{ label: `${initialCity.name}, ${initialCity.province}`, value: initialCity.oid }] : []}
          onChange={(v) => {
            setValue('cityId', v.toString())
            trigger('cityId')
          }}
        />
        {errorMessage && <span className="text-red-500">{errorMessage}</span>}
        <div className="mt-8 flex justify-between">
          <Button onClick={onClose} color="primary" variant="light" className="mr-2 w-1/2">
            Cancel
          </Button>
          <Button type="submit" color="primary" className="ml-2 w-1/2">
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default Modal
