import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Alert, Button, Editor, Input, InputWrapper, Modal, ModalFooter, ModalHeader, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import DocumentFileUpload from '@/components/FileUploads/DocumentFileUpload'
import { TINYMCE_API_KEY } from '@/constants/globals'
import { dashboardService } from '@/services'
import { axiosErrorMessage } from '@/utils'

type CreateModalProps = {
  onClose?: () => void
  onRefresh?: () => void
  show: boolean
}

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object().shape({
  content: yup.string().required().label('Content'),
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
  title: yup.string().required().label('Title'),
})

const CreateModal: React.FC<CreateModalProps> = ({ onClose, onRefresh, show }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
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
    <Modal as="form" className="max-w-3xl" onSubmit={onSubmit} show={show}>
      <ModalHeader onClose={onClose} subTitle="Create a new Announcement">
        Create Announcement
      </ModalHeader>
      <div className="flex flex-col gap-3 p-3">
        {errorMessage && <Alert color="error">{errorMessage}</Alert>}
        <Input error={errors.title?.message} label="Title" labelRequired {...register('title')} />

        <InputWrapper error={errors.poster?.message} label="Upload file">
          <DocumentFileUpload
            error={errors.poster?.message}
            onChange={(value) => {
              setValue('poster', value)
              trigger('poster')
            }}
            onError={(message) => {
              setValue('poster', ERROR_PREFIX_KEY + message)
              trigger('poster')
            }}
            onStart={() => {
              setValue('poster', PROGRESS_KEY)
            }}
            type="applicant-result"
            value={getValues('poster')}
          />
        </InputWrapper>

        <Editor
          apiKey={TINYMCE_API_KEY}
          error={errors.content?.message}
          label="Content"
          labelRequired
          {...register('content')}
          onValueChange={(value) => {
            setValue('content', value)
            trigger('content')
          }}
        />
      </div>
      <ModalFooter>
        <Button className="w-24" color="error" disabled={isLoading} onClick={onClose} type="button" variant="light">
          Cancel
        </Button>
        <Button className="w-24" color="primary" disabled={isLoading} loading={isLoading} type="submit">
          Create
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default CreateModal
