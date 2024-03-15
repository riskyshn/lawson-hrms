import React, { useState } from 'react'
import { Button, Input, useToast } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { organizationService } from '@/services'
import { IJobLevel } from '@/types/oganizartion'

type ModalProps = {
  show: boolean
  onClose: () => void
  jobLevel?: IJobLevel | null
  onSubmitSuccess: () => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Job Level Name'),
})

const Modal: React.FC<ModalProps> = ({ show, onClose, jobLevel, onSubmitSuccess }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string>('')
  const toast = useToast()
  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: jobLevel?.name || '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      if (jobLevel) {
        await organizationService.updateJobLevel(jobLevel.oid, data)
        toast('Job Level updated successfully', { color: 'success', position: 'top-right' })
      } else {
        await organizationService.createJobLevel(data)
        toast('Job Level created successfully', { color: 'success', position: 'top-right' })
      }

      onSubmitSuccess()
      onClose()
    } catch (error: any) {
      if (error.name !== 'AbortError') {
        const errorMessage = error.response?.data?.meta?.message || error.message
        setErrorMessage(errorMessage)
        toast(errorMessage, { color: 'error', position: 'top-right' })
      }
    } finally {
      setIsLoading(false)
    }
  })

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="mb-2">
          <h4 className="text-xl font-semibold">{jobLevel ? 'Update Job Level' : 'Add Job Level'}</h4>
        </div>
        <Input label="Job Level Name" labelRequired required {...form.register('name')} />
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
