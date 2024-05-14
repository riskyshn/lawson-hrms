import type { IDocumentRequest } from '@jshrms/shared/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import LoadingScreen from '@jshrms/shared/components/Elements/Layout/LoadingScreen'
import { useAsyncAction } from '@jshrms/shared/hooks'
import { masterService, organizationService } from '@jshrms/shared/services'
import { axiosErrorMessage } from '@jshrms/shared/utils'
import { Alert, Button, Input, Modal, ModalFooter, ModalHeader, MultiSelect, useRemember, useToast } from '@jshrms/ui'
import * as yup from 'yup'
import getEditModalSubtitle from '../../utils/get-edit-modal-subtitle'

type EditModalProps = {
  item?: IDocumentRequest | null
  onClose?: () => void
  onUpdated?: (item: IDocumentRequest) => void
}

const schema = yup.object().shape({
  allowedFileTypes: yup.array().of(yup.string().required().label('File Type')).required().label('Allowed File Types'),
  name: yup.string().required().label('Document Name'),
})

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [fileTypes] = useAsyncAction(masterService.fetchFileTypes)

  const rItem = useRemember(item)
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (item && fileTypes?.content) {
      setIsLoading(false)
      setErrorMessage('')
      setValue('name', item.name || '')
      setValue(
        'allowedFileTypes',
        fileTypes.content.filter((el) => item.allowedFileTypes.includes(el.extension)).map((el) => el.extension),
      )

      trigger(['allowedFileTypes', 'name'])
    }
  }, [fileTypes?.content, item, setValue, trigger])

  const onSubmit = handleSubmit(async (data) => {
    if (!item) return

    try {
      setIsLoading(true)
      setErrorMessage('')

      const updatedItem = await organizationService.updateDocumentRequest(item.oid, data)
      onUpdated?.(updatedItem)
      toast('Document Request updated successfully', { color: 'success' })

      onClose?.()
    } catch (e) {
      setErrorMessage(axiosErrorMessage(e))
      setIsLoading(false)
    }
  })

  return (
    <Modal as="form" onSubmit={onSubmit} show={!!item}>
      <ModalHeader onClose={onClose} subTitle={getEditModalSubtitle(rItem)}>
        Update Document Request
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
          Update
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default EditModal
