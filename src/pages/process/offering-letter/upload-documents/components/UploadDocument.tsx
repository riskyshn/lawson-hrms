import DocumentFileUpload from '@/components/FileUploads/DocumentFileUpload'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, InputWrapper } from 'jobseeker-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  link: yup
    .string()
    .required()
    .test('is-loading', '${label} is still uploading', (value) => value !== PROGRESS_KEY)
    .test(
      'is-error',
      ({ value }) => value.replace(ERROR_PREFIX_KEY, ''),
      (value) => !value.startsWith(ERROR_PREFIX_KEY),
    )
    .url()
    .label('Document'),
})

const UploadDocument: React.FC<{
  isFirst?: boolean
  isLast?: boolean
  isLoading?: boolean
  link?: string
  handlePrev: () => void
  handleSubmit: (link: string) => void
}> = (props) => {
  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { link: props.link || '' },
  })

  const onSubmit = handleSubmit(({ link }) => props.handleSubmit(link))

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <InputWrapper label="Document" labelRequired error={errors.link?.message}>
          <DocumentFileUpload
            type="applicant-result"
            value={getValues('link')}
            error={errors.link?.message}
            onStart={() => {
              setValue('link', PROGRESS_KEY)
            }}
            onChange={(value) => {
              setValue('link', value)
              trigger('link')
            }}
            onError={(message) => {
              setValue('link', ERROR_PREFIX_KEY + message)
              trigger('link')
            }}
          />
        </InputWrapper>
      </CardBody>

      <CardFooter className="gap-3">
        {!props.isFirst && (
          <Button type="button" color="default" variant="light" className="w-32" disabled={props.isLoading} onClick={props.handlePrev}>
            Prev
          </Button>
        )}
        {!props.isLast && (
          <Button type="submit" color="primary" className="w-32">
            Next
          </Button>
        )}
        {props.isLast && (
          <Button type="submit" color="primary" className="w-32" disabled={props.isLoading} loading={props.isLoading}>
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default UploadDocument
