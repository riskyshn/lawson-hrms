import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import DocumentFileUpload from '@jshrms/shared/components/Elements/FileUploads/DocumentFileUpload'
import ImageFileUpload from '@jshrms/shared/components/Elements/FileUploads/ImageFileUpload'
import { Button, Card, CardBody, CardFooter, InputWrapper } from '@jshrms/ui'
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
  allowedFileTypes: string[]
  handlePrev: () => void
  handleSubmit: (link: string) => void
  isFirst?: boolean
  isLast?: boolean
  isLoading?: boolean
  link?: string
}> = (props) => {
  const {
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    defaultValues: { link: props.link || '' },
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(({ link }) => props.handleSubmit(link))

  const isImage = props.allowedFileTypes.some((type) => ['jpeg', 'jpg', 'pdf', 'png', 'webp'].includes(type))

  return (
    <Card as="form" onSubmit={onSubmit}>
      <CardBody className="grid grid-cols-1 gap-2">
        <InputWrapper error={errors.link?.message} label="Document" labelRequired>
          {isImage ? (
            <ImageFileUpload
              error={errors.link?.message}
              onChange={(value) => {
                setValue('link', value)
                trigger('link')
              }}
              onError={(message) => {
                setValue('link', ERROR_PREFIX_KEY + message)
                trigger('link')
              }}
              onStart={() => {
                setValue('link', PROGRESS_KEY)
              }}
              type="employee-national-id"
              value={getValues('link')}
            />
          ) : (
            <DocumentFileUpload
              error={errors.link?.message}
              onChange={(value) => {
                setValue('link', value)
                trigger('link')
              }}
              onError={(message) => {
                setValue('link', ERROR_PREFIX_KEY + message)
                trigger('link')
              }}
              onStart={() => {
                setValue('link', PROGRESS_KEY)
              }}
              type="applicant-result"
              value={getValues('link')}
            />
          )}
        </InputWrapper>
      </CardBody>

      <CardFooter className="gap-3">
        {!props.isFirst && (
          <Button className="w-32" color="default" disabled={props.isLoading} onClick={props.handlePrev} type="button" variant="light">
            Prev
          </Button>
        )}
        {props.isFirst && (
          <Button
            as={Link}
            className="w-32"
            color="error"
            disabled={props.isLoading}
            onClick={props.handlePrev}
            to="/process/offering-letter"
            variant="light"
          >
            Cancel
          </Button>
        )}
        {!props.isLast && (
          <Button className="w-32" color="primary" type="submit">
            Next
          </Button>
        )}
        {props.isLast && (
          <Button className="w-32" color="primary" disabled={props.isLoading} loading={props.isLoading} type="submit">
            Submit
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}

export default UploadDocument
