import React, { useEffect, useState } from 'react'
import { Button, Input, MultiSelect, OptionProps, useToast } from 'jobseeker-ui'
import MainModal from '@/components/Elements/MainModal'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { axiosErrorMessage } from '@/utils/axios'
// import { organizationService } from '@/services'

type ModalProps = {
  show: boolean
  onClose: () => void
  documentRequest?: any
  onSubmitSuccess: () => void
}

const schema = yup.object().shape({
  document: yup.string().required().label('Document Request Name'),
})

const Modal: React.FC<ModalProps> = ({ show, onClose, documentRequest, onSubmitSuccess }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()
  const [selectedValues, setSelectedValues] = useState<(string | number)[]>([])

  const handleSelectionChange = (values: (string | number)[]) => {
    setSelectedValues(values)
  }
  const options = ['JPG/PNG/JPEG', 'PDF']

  const transformedOptions: OptionProps[] = options.map((option) => ({
    label: option,
    value: option,
  }))

  const form = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      document: documentRequest?.document || '',
    },
  })

  const onSubmit = form.handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      if (documentRequest) {
        // await organizationService.updateDocumentRequest(documentRequest.oid, data)
        toast('Document Request updated successfully', { color: 'success', position: 'top-right' })
      } else {
        // await organizationService.createDocumentRequest(data)
        toast('Document Request created successfully', { color: 'success', position: 'top-right' })
      }

      onSubmitSuccess()
      onClose()
    } catch (error) {
      setErrorMessage(axiosErrorMessage(error))
    } finally {
      setIsLoading(false)
    }
  })

  useEffect(() => {
    if (documentRequest) {
      setSelectedValues(documentRequest.fileType)
    }
  }, [documentRequest])

  return (
    <MainModal className="max-w-xl py-12" show={show} onClose={onClose}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <div className="mb-2">
          <h4 className="text-xl font-semibold">{documentRequest ? 'Update Document Request' : 'Add Document Request'}</h4>
        </div>
        <Input label="Document Request Name" labelRequired required {...form.register('document')} />
        <MultiSelect
          label="Single Select"
          labelRequired
          options={transformedOptions}
          value={selectedValues}
          onChange={handleSelectionChange}
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
