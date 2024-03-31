import ImageFileUpload from '@/components/FileUploads/ImageFileUpload'
import { organizationService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, InputWrapper, Modal, ModalFooter, ModalHeader, Spinner, Textarea, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type PropTypes = {
  show?: boolean
  onClose?: () => void
}

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  letterHead: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('Letter Head'),
  greetings: yup.string().label('Greetings'),
  body: yup.string().required().label('Body'),
  additionalInformation: yup.string().required().label('Additional Information'),
  signeeRole: yup.string().required().label('Signee Role'),
  signeeName: yup.string().required().label('Signee Full Name'),
  signature: yup
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
    .label('Signature'),
})

const SetupOfferingLetterModal: React.FC<PropTypes> = ({ show, onClose }) => {
  const [offeringLetterSetting, setOfferingLetterSetting] = useState<IOfferingLetterSetting>()
  const [previewLoading, setPreviewLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)

  const toast = useToast()

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!show) return
    if (offeringLetterSetting) return

    const load = async () => {
      try {
        const data = await organizationService.fetchOfferingLetterSetting()
        setOfferingLetterSetting(data)
      } catch (e) {
        toast(axiosErrorMessage(e), { color: 'error' })
        onClose?.()
      }
    }
    load()
  }, [offeringLetterSetting, show, reset, onClose, toast])

  useEffect(() => {
    if (!offeringLetterSetting) return

    setValue('letterHead', offeringLetterSetting.letterHead || '')
    setValue('greetings', offeringLetterSetting.greetings || '')
    setValue('body', offeringLetterSetting.body || '')
    setValue('additionalInformation', offeringLetterSetting.additionalInformation || '')
    setValue('signeeRole', offeringLetterSetting.signeeRole || '')
    setValue('signeeName', offeringLetterSetting.signeeName || '')
    setValue('signature', offeringLetterSetting.signature || '')

    trigger()
  }, [offeringLetterSetting, setValue, trigger])

  const onSubmit = handleSubmit(async (data) => {
    if (!offeringLetterSetting) return

    setSubmitLoading(true)
    try {
      const newOfferingLetterSetting = await organizationService.updateOfferingLetterSetting({
        ...offeringLetterSetting,
        ...data,
      })
      onClose?.()
      toast('Offering letter settings updated successfully.', { color: 'success' })
      setTimeout(() => {
        setOfferingLetterSetting(newOfferingLetterSetting)
      }, 200)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setSubmitLoading(false)
  })

  const onPreview = async () => {
    if (!offeringLetterSetting) return

    setPreviewLoading(true)
    try {
      throw new Error('Endpoint api belum ada! segerah hubungi mas akbar.')
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setPreviewLoading(false)
  }

  return (
    <Modal as="form" show={!!show} onSubmit={onSubmit}>
      <ModalHeader subTitle="Adjust your offering letter template" onClose={onClose}>
        Setup Offering Letter
      </ModalHeader>

      {!offeringLetterSetting && (
        <div className="flex h-[600px] items-center justify-center">
          <Spinner height={40} className="text-primary-600" />
        </div>
      )}

      {offeringLetterSetting && (
        <div className="grid grid-cols-1 gap-3 p-3">
          <InputWrapper label="Letter Head" labelRequired error={errors.letterHead?.message}>
            <ImageFileUpload
              hidePreview
              type="employee-national-id"
              value={getValues('letterHead')}
              error={errors.letterHead?.message}
              onStart={() => {
                setValue('letterHead', PROGRESS_KEY)
              }}
              onChange={(value) => {
                setValue('letterHead', value)
                trigger('letterHead')
              }}
              onError={(message) => {
                setValue('letterHead', ERROR_PREFIX_KEY + message)
                trigger('letterHead')
              }}
            />
          </InputWrapper>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <Input label="Greetings" error={errors.greetings?.message} {...register('greetings')} />
            <Input label="Candidate Name" defaultValue="[CANDIDATE NAME]" disabled />
          </div>
          <Textarea label="Body" labelRequired rows={3} error={errors.body?.message} {...register('body')} />
          <Input label="Salary & Benefits" disabled />
          <Textarea
            label="Additional Information"
            labelRequired
            rows={3}
            error={errors.additionalInformation?.message}
            {...register('additionalInformation')}
          />
          <Input label="Signee Role" labelRequired error={errors.signeeRole?.message} {...register('signeeRole')} />
          <Input label="Signee Full Name" labelRequired error={errors.signeeName?.message} {...register('signeeName')} />

          <InputWrapper label="Signature" error={errors.signature?.message}>
            <ImageFileUpload
              hidePreview
              type="employee-national-id"
              value={getValues('signature')}
              error={errors.signature?.message}
              onStart={() => {
                setValue('signature', PROGRESS_KEY)
              }}
              onChange={(value) => {
                setValue('signature', value)
                trigger('signature')
              }}
              onError={(message) => {
                setValue('signature', ERROR_PREFIX_KEY + message)
                trigger('signature')
              }}
            />
          </InputWrapper>
        </div>
      )}

      <ModalFooter className="justify-between gap-3">
        <Button
          type="button"
          color="error"
          variant="light"
          disabled={submitLoading || previewLoading}
          className="min-w-24"
          onClick={onClose}
        >
          Cancel
        </Button>
        <div className="flex gap-3">
          <Button
            type="button"
            color="primary"
            variant="light"
            disabled={submitLoading || previewLoading || !offeringLetterSetting}
            loading={previewLoading}
            className="min-w-24"
            onClick={onPreview}
          >
            Preview
          </Button>
          <Button
            type="submit"
            color="primary"
            className="min-w-24"
            disabled={submitLoading || previewLoading || !offeringLetterSetting}
            loading={submitLoading}
          >
            Save Changes
          </Button>
        </div>
      </ModalFooter>
    </Modal>
  )
}

export default SetupOfferingLetterModal
