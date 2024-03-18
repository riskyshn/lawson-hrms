import React, { useState } from 'react'
import { Button, Select, Textarea, useToast } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { useForm } from 'react-hook-form'
import { axiosErrorMessage } from '@/utils/axios'
import { useSearchParams } from 'react-router-dom'

type ModalProps = {
  show: boolean
  onClose: () => void
  items?: any
}

const ResignTerminateModal: React.FC<ModalProps> = ({ show, onClose, items }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()
  const [searchParams, setSearchParam] = useSearchParams()
  const status = searchParams.get('status') || undefined

  const { register, handleSubmit } = useForm({})

  const onSubmit = handleSubmit(async (data) => {
    console.log(data)
    try {
      setIsLoading(true)
      setErrorMessage('')

      toast('Branch created successfully', { color: 'success', position: 'top-right' })

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
        <div className="mb-2">
          <h4 className="mb-2 text-center text-2xl font-semibold">Select Reason</h4>
          <p className="text-center">Please select the reason of why this candidate is resigned/terminated</p>
        </div>
        <Select
          label="Resign/Terminated"
          value={status}
          onChange={(e) => {
            searchParams.set('status', e.toString())
            setSearchParam(searchParams)
          }}
          options={['Resign', 'Terminated'].map((el) => ({
            label: el,
            value: el.toLocaleLowerCase(),
          }))}
        />
        <Textarea rows={3} label="Reason" {...register('reason')} />
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

export default ResignTerminateModal
