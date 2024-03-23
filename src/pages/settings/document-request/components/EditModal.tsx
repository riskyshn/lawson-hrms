import MainModal from '@/components/Elements/MainModal'
import { organizationService } from '@/services'
import { useMasterStore } from '@/store'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Input, MultiSelect, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type EditModalProps = {
  item?: IDocumentRequest | null
  onClose?: () => void
  onUpdated?: (item: IDocumentRequest) => void
}

const schema = yup.object().shape({
  name: yup.string().required().label('Document Name'),
  allowedFileTypes: yup.array().of(yup.string().required().label('File Type')).required().label('Allowed File Types'),
})

const EditModal: React.FC<EditModalProps> = ({ item, onClose, onUpdated }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

  const { fileTypes } = useMasterStore()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (item) {
      setIsLoading(false)
      setErrorMessage('')
      setValue('name', item.name || '')
      setValue('allowedFileTypes', item.allowedFileTypes || [])
      trigger(['allowedFileTypes', 'name'])
    }
  }, [item, setValue, trigger])

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
    <MainModal className="max-w-xl" show={!!item}>
      <h4 className="mb-4 text-2xl font-semibold">Update Document Request</h4>
      <form className="flex flex-col gap-3" onSubmit={onSubmit}>
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
            Update
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default EditModal
