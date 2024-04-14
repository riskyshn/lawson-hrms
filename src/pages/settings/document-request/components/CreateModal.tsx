import { organizationService } from '@/services'
import { useMasterStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, MultiSelect, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type CreateModalProps = {
  show: boolean
  onClose?: () => void
  onCreated?: (item: IDocumentRequest) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Document Name'),
  allowedFileTypes: yup.array().of(yup.string().required().label('File Type')).required().label('Allowed File Types'),
})

const CreateModal: React.FC<CreateModalProps> = ({ show, onClose, onCreated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const { fileTypes } = useMasterStore()

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

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsLoading(true)
      setErrorMessage('')

      const createdItem = await organizationService.createDocumentRequest(data)
      onCreated?.(createdItem)
      toast('Document Request created successfully', { color: 'success' })

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
      <ModalHeader subTitle="Set up a new document request for your company" onClose={onClose}>
        Create Document Request
      </ModalHeader>

      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input label="Document Name" labelRequired error={errors.name?.message} {...register('name')} />
        <MultiSelect
          label="Allowed File Types"
          labelRequired
          options={fileTypes.map((el) => ({ label: el.name, value: el.extension }))}
          name="allowedFileTypes"
          error={errors.allowedFileTypes?.message}
          value={getValues('allowedFileTypes')}
          onChange={(v) => {
            setValue(
              'allowedFileTypes',
              v.map((el) => el.toString()),
            )
            trigger('allowedFileTypes')
          }}
        />
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
