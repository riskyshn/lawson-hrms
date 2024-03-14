import React, { useState } from 'react'
import { Button, Input, useToast } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { axiosErrorMessage } from '@/utils/axios'
import { organizationService } from '@/services'

type ModalProps = {
  show: boolean
  onClose: () => void
  department?: any
  onSubmitSuccess: () => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Department Name'),
  code: yup.string().required().label('Department Code'),
})

const Modal: React.FC<ModalProps> = ({ show, onClose, department, onSubmitSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: department?.name || '',
      code: department?.code || '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      if (department) {
        await organizationService.updateDepartment(department.oid, data)
        toast('Department updated successfully', { color: 'success', position: 'top-right' })
      } else {
        await organizationService.createDepartment(data)
        toast('Department updated successfully', { color: 'success', position: 'top-right' })
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
          <h4 className="mb-2 text-2xl font-semibold">{department ? 'Update Department' : 'Add Department'}</h4>
        </div>
        <Input label="Department Name*" {...form.register('name')} />
        <Input label="Department Code*" {...form.register('code')} />
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
