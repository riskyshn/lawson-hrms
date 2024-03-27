import ImageUploader from '@/components/Elements/ImageUploader'
import MainModal from '@/components/Elements/MainModal'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, InputRadio, InputWrapper, Textarea, useToast } from 'jobseeker-ui'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

type UpdateResultModalProps = {
  show?: boolean
  applicant?: IDataTableApplicant
  onClose?: () => void
  onSubmited?: () => void
}

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  status: yup.string().required().label('Status'),
  notes: yup.string().required().label('Notes'),
  file: yup
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
    .label('File'),
})

const UpdateResultModal: React.FC<UpdateResultModalProps> = ({ show, applicant, onClose, onSubmited }) => {
  const [loading, setLoading] = useState(false)

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
    if (applicant) {
      setLoading(false)
      reset()
    }
  }, [applicant, reset])

  const onSubmit = handleSubmit(async (data) => {
    if (!applicant) return
    setLoading(true)
    try {
      await processService.updateProcessResult({
        applicantId: applicant.oid,
        ...data,
      })
      onSubmited?.()
      onClose?.()
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  })

  return (
    <MainModal className="max-w-xl py-12" show={!!show} onClose={onClose}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Candidate Result</h4>
      </div>
      <form onSubmit={onSubmit} className="grid grid-cols-1 gap-3">
        <InputWrapper label="Update Candidate’s Result" labelRequired error={errors.status?.message}>
          <div className="flex gap-4">
            <InputRadio className="text-green-600" id="radio-passed" value="PASSED" {...register('status')}>
              Passed
            </InputRadio>
            <InputRadio className="text-red-600" id="radio-failed" value="FAILED" {...register('status')}>
              Failed
            </InputRadio>
          </div>
        </InputWrapper>

        <Textarea label="Notes" rows={4} error={errors.notes?.message} {...register('notes')} />

        <InputWrapper label="Upload file" error={errors.file?.message}>
          <ImageUploader
            value={getValues('file')}
            hidePreview
            error={errors.file?.message}
            onStart={() => {
              setValue('file', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('file', value)
              trigger('file')
            }}
            onError={(message) => {
              setValue('file', ERROR_PREFIX_KEY + message)
              trigger('file')
            }}
          />
        </InputWrapper>

        <div className="mt-4 flex justify-end gap-2">
          <Button type="button" onClick={onClose} color="error" variant="light" disabled={loading} className="w-24">
            Cancel
          </Button>
          <Button type="submit" color="primary" className="w-24" disabled={loading} loading={loading}>
            Submit
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default UpdateResultModal
