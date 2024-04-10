import MainModal from '@/components/Elements/Modals/MainModal'
import { organizationService } from '@/services'
import { useMasterStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, MultiSelect, useToast } from 'jobseeker-ui'
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
    <MainModal className="max-w-xl" show={show}>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
        <h4 className="mb-4 text-2xl font-semibold">Create Document Request</h4>

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

        <div className="mt-8 flex justify-end gap-3">
          <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
            Save
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default CreateModal
