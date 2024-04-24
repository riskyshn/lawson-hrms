import DocumentFileUpload from '@/components/Elements/FileUploads/DocumentFileUpload'
import { TINYMCE_API_KEY } from '@/constants/globals'
import { dashboardService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Editor, Input, InputWrapper, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type CreateModalProps = {
  show: boolean
  onClose?: () => void
  onRefresh?: () => void
}

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object().shape({
  title: yup.string().required().label('Title'),
  poster: yup
    .string()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value?.replace(ERROR_PREFIX_KEY, ''),
      (value) => {
        if (value && typeof value === 'string') return !value.startsWith(ERROR_PREFIX_KEY)
        return true
      },
    )
    .url()
    .label('Poster'),
  content: yup.string().required().label('Content'),
})

const CreateModal: React.FC<CreateModalProps> = ({ show, onClose, onRefresh }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const toast = useToast()

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

      await dashboardService.createAnnouncement(data)
      onRefresh?.()
      toast('Announcement created successfully', { color: 'success' })

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
    <Modal as="form" className="max-w-3xl" show={show} onSubmit={onSubmit}>
      <ModalHeader subTitle="Create a new Announcement" onClose={onClose}>
        Create Announcement
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input label="Title" labelRequired error={errors.title?.message} {...register('title')} />

        <InputWrapper label="Upload file" error={errors.poster?.message}>
          <DocumentFileUpload
            type="applicant-result"
            value={getValues('poster')}
            error={errors.poster?.message}
            onStart={() => {
              setValue('poster', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('poster', value)
              trigger('poster')
            }}
            onError={(message) => {
              setValue('poster', ERROR_PREFIX_KEY + message)
              trigger('poster')
            }}
          />
        </InputWrapper>

        <Editor label="Content" error={errors.content?.message} labelRequired apiKey={TINYMCE_API_KEY} {...register('content')} />
      </div>
      <ModalFooter>
        <Button type="button" color="error" variant="light" className="w-24" disabled={isLoading} onClick={onClose}>
          Cancel
        </Button>
        <Button type="submit" color="primary" className="w-24" disabled={isLoading} loading={isLoading}>
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
