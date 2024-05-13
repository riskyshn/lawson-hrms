import type { IOfferingLetterSetting } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Input, InputWrapper, Modal, ModalFooter, ModalHeader, Spinner, Textarea, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import ImageFileUpload from '@/components/Elements/FileUploads/ImageFileUpload'
import { organizationService, processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

type PropTypes = {
  onClose?: () => void
  show?: boolean
}

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  additionalInformation: yup.string().required().label('Additional Information'),
  body: yup.string().required().label('Body'),
  greetings: yup.string().label('Greetings'),
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
  signeeName: yup.string().required().label('Signee Full Name'),
  signeeRole: yup.string().required().label('Signee Role'),
})

const SetupOfferingLetterModal: React.FC<PropTypes> = ({ onClose, show }) => {
  const [offeringLetterSetting, setOfferingLetterSetting] = useState<IOfferingLetterSetting>()
  const [previewLoading, setPreviewLoading] = useState(false)
  const [submitLoading, setSubmitLoading] = useState(false)
  const [preview, setPreview] = useState('')

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
      const response = await processService.previewOfferingLetterPlain({ headers: { Accept: 'application/pdf' } })
      const blob = new Blob([response.data], { type: 'application/pdf' })
      const url = URL.createObjectURL(blob)
      setPreview(url)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setPreviewLoading(false)
  }

  return (
    <>
      <Modal className="flex h-full max-w-[1280px]" onClose={() => setPreview('')} show={!!preview} wrapperClassName="h-full">
        <iframe className="block flex-1 rounded-lg" src={preview} />
      </Modal>
      <Modal as="form" onSubmit={onSubmit} show={!!show}>
        <ModalHeader onClose={onClose} subTitle="Adjust your offering letter template">
          Setup Offering Letter
        </ModalHeader>

        {!offeringLetterSetting && (
          <div className="flex h-[600px] items-center justify-center">
            <Spinner className="text-primary-600" height={40} />
          </div>
        )}

        {offeringLetterSetting && (
          <div className="grid grid-cols-1 gap-3 p-3">
            <InputWrapper error={errors.letterHead?.message} label="Letter Head" labelRequired>
              <ImageFileUpload
                error={errors.letterHead?.message}
                hidePreview
                onChange={(value) => {
                  setValue('letterHead', value)
                  trigger('letterHead')
                }}
                onError={(message) => {
                  setValue('letterHead', ERROR_PREFIX_KEY + message)
                  trigger('letterHead')
                }}
                onStart={() => {
                  setValue('letterHead', PROGRESS_KEY)
                }}
                type="employee-national-id"
                value={getValues('letterHead')}
              />
            </InputWrapper>

            <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
              <Input error={errors.greetings?.message} label="Greetings" {...register('greetings')} />
              <Input defaultValue="[CANDIDATE NAME]" disabled label="Candidate Name" />
            </div>
            <Textarea error={errors.body?.message} label="Body" labelRequired rows={3} {...register('body')} />
            <Input disabled label="Salary & Benefits" />
            <Textarea
              error={errors.additionalInformation?.message}
              label="Additional Information"
              labelRequired
              rows={3}
              {...register('additionalInformation')}
            />
            <Input error={errors.signeeRole?.message} label="Signee Role" labelRequired {...register('signeeRole')} />
            <Input error={errors.signeeName?.message} label="Signee Full Name" labelRequired {...register('signeeName')} />

            <InputWrapper error={errors.signature?.message} label="Signature">
              <ImageFileUpload
                error={errors.signature?.message}
                hidePreview
                onChange={(value) => {
                  setValue('signature', value)
                  trigger('signature')
                }}
                onError={(message) => {
                  setValue('signature', ERROR_PREFIX_KEY + message)
                  trigger('signature')
                }}
                onStart={() => {
                  setValue('signature', PROGRESS_KEY)
                }}
                type="employee-national-id"
                value={getValues('signature')}
              />
            </InputWrapper>
          </div>
        )}

        <ModalFooter className="justify-between gap-3">
          <Button
            className="min-w-24"
            color="error"
            disabled={submitLoading || previewLoading}
            onClick={onClose}
            type="button"
            variant="light"
          >
            Cancel
          </Button>
          <div className="flex gap-3">
            <Button
              className="min-w-24"
              color="primary"
              disabled={submitLoading || previewLoading || !offeringLetterSetting}
              loading={previewLoading}
              onClick={onPreview}
              type="button"
              variant="light"
            >
              Preview
            </Button>
            <Button
              className="min-w-24"
              color="primary"
              disabled={submitLoading || previewLoading || !offeringLetterSetting}
              loading={submitLoading}
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default SetupOfferingLetterModal
