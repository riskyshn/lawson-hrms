import type { IDataTableApplicant } from '@/types'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, InputRadio, InputWrapper, Textarea, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import DocumentFileUpload from '@/components/Elements/FileUploads/DocumentFileUpload'
import MainModal from '@/components/Elements/Modals/MainModal'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

type UpdateResultModalProps = {
  applicant?: IDataTableApplicant
  onClose?: () => void
  onSubmited?: () => void
  show?: boolean
}

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
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
  notes: yup.string().required().label('Notes'),
  status: yup.string().required().label('Status'),
})

const UpdateResultModal: React.FC<UpdateResultModalProps> = ({ applicant, onClose, onSubmited, show }) => {
  const [loading, setLoading] = useState(false)

  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    register,
    reset,
    setValue,
    trigger,
    watch,
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
    <MainModal className="max-w-xl py-12" onClose={onClose} show={!!show}>
      <div className="mb-8">
        <h4 className="mb-2 text-center text-2xl font-semibold">Candidate Result</h4>
      </div>
      <form className="grid grid-cols-1 gap-3" onSubmit={onSubmit}>
        <InputWrapper error={errors.status?.message} label="Update Candidate’s Result" labelRequired>
          <div className="flex gap-4 py-3">
            <InputRadio
              checked={watch('status') === 'PASSED'}
              className="text-green-600"
              id="radio-passed"
              onChange={(e) => {
                if (e.target.checked) {
                  setValue('status', 'PASSED')
                  trigger('status')
                }
              }}
              value="PASSED"
            >
              Passed
            </InputRadio>
            <InputRadio
              checked={watch('status') === 'FAILED'}
              className="text-red-600"
              id="radio-failed"
              onChange={(e) => {
                if (e.target.checked) {
                  setValue('status', 'FAILED')
                  trigger('status')
                }
              }}
              value="FAILED"
            >
              Failed
            </InputRadio>
          </div>
        </InputWrapper>

        <Textarea error={errors.notes?.message} label="Notes" rows={4} {...register('notes')} />

        <InputWrapper error={errors.file?.message} label="Upload file">
          <DocumentFileUpload
            error={errors.file?.message}
            onChange={(value) => {
              setValue('file', value)
              trigger('file')
            }}
            onError={(message) => {
              setValue('file', ERROR_PREFIX_KEY + message)
              trigger('file')
            }}
            onStart={() => {
              setValue('file', PROGRESS_KEY)
            }}
            type="applicant-result"
            value={getValues('file')}
          />
        </InputWrapper>

        <div className="mt-4 flex justify-end gap-2">
          <Button className="w-24" color="error" disabled={loading} onClick={onClose} type="button" variant="light">
            Cancel
          </Button>
          <Button className="w-24" color="primary" disabled={loading} loading={loading} type="submit">
            Submit
          </Button>
        </div>
      </form>
    </MainModal>
  )
}

export default UpdateResultModal
