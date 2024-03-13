import React, { useState } from 'react'
import { Button, Input, Textarea } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { axiosErrorMessage } from '@/utils/axios'
import { organizationService } from '@/services'

type ModalProps = {
  show: boolean
  onClose: () => void
  branch?: any
}

const schema = yup.object().shape({
  name: yup.string().required().label('Branch Name'),
  address: yup.string().required().label('Address'),
  longitudeLatitude: yup.string().required().label('Longitude-Latitude'),
  range: yup.string().required().label('Range'),
  cityId: yup.string().label('City Id'),
})

const Modal: React.FC<ModalProps> = ({ show, onClose, branch }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: branch?.name || '',
      address: branch?.address || '',
      longitudeLatitude: '',
      range: '',
      cityId: branch?.cityId || '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      if (branch) {
        console.log(data.cityId)
        await organizationService.updateBranch(branch.oid, data)
      } else {
        await organizationService.createBranch(data)
      }

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
        <Input label="Branch Name*" {...form.register('name')} />
        <Textarea rows={3} label="Address*" {...form.register('address')} />
        <Input label="Longitude-Latitude*" {...form.register('longitudeLatitude')} />
        <Input label="Range*" {...form.register('range')} />
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
