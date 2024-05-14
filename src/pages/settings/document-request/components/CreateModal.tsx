import type { IDocumentRequest } from '@jshrms/shared/types'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingScreen from '@jshrms/shared/components/Elements/Layout/LoadingScreen'
import { useAsyncAction } from '@jshrms/shared/hooks'
import { masterService, organizationService } from '@jshrms/shared/services'
import { axiosErrorMessage } from '@jshrms/shared/utils'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, MultiSelect, useToast } from '@jshrms/ui'
import * as yup from 'yup'

type CreateModalProps = {
  onClose?: () => void
  onCreated?: (item: IDocumentRequest) => void
  show: boolean
}

const schema = yup.object().shape({
  allowedFileTypes: yup.array().of(yup.string().required().label('File Type')).required().label('Allowed File Types'),
  name: yup.string().required().label('Document Name'),
})

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onCreated, show }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fileTypes] = useAsyncAction(masterService.fetchFileTypes)
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
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
    <Modal as="form" onSubmit={onSubmit} show={show}>
      <ModalHeader onClose={onClose} subTitle="Set up a new document request for your company">
        Create Document Request
      </ModalHeader>

      <LoadingScreen show={!fileTypes} />

      {!!fileTypes && (
        <div className="flex flex-col gap-3 p-3">
          {errorMessage && <Alert color="error">{errorMessage}</Alert>}

          <Input error={errors.name?.message} label="Document Name" labelRequired {...register('name')} />

          <MultiSelect
            error={errors.allowedFileTypes?.message}
            label="Allowed File Types"
            labelRequired
            name="allowedFileTypes"
            onValueChange={(v) => {
              setValue('allowedFileTypes', v)
              trigger('allowedFileTypes')
            }}
            options={fileTypes?.content.map((el) => ({ label: el.name, value: el.extension }))}
            value={getValues('allowedFileTypes')}
          />
        </div>
      )}

      <ModalFooter>
        <Button className="w-24" color="error" disabled={isLoading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="w-24" color="primary" disabled={isLoading} loading={isLoading} type="submit">
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
