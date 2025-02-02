import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, Container, InputWrapper, PageHeader, useToast } from 'jobseeker-ui'
import * as yup from 'yup'
import { DocumentFileUpload } from '@/components'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  file: yup
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

export const Component: React.FC = () => {
  const { applicantId } = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async ({ file }) => {
    setLoading(true)
    try {
      await processService.uploadSignedOfferingLetter({ applicantId, file })
      toast('Upload Signed Offering Letter successfully uploaded.', { color: 'success' })
      navigate(`/process/offering-letter`)
    } catch (error) {
      toast(axiosErrorMessage(error), { color: 'error' })
      setLoading(false)
    }
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: 'Upload Signed Offering Letter' }]}
        title="Upload Signed Offering Letter"
      />

      <Container className="flex flex-col gap-3 py-3 xl:pb-8">
        <Card as="form" onSubmit={onSubmit}>
          <CardBody className="grid grid-cols-1 gap-2">
            <InputWrapper error={errors.file?.message} label="Document" labelRequired>
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
          </CardBody>

          <CardFooter className="gap-3">
            <Button as={Link} className="w-32" color="error" to="/process/offering-letter" variant="light">
              Cancel
            </Button>
            <Button className="w-32" color="primary" disabled={loading} loading={loading} type="submit">
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

Component.displayName = 'UploadSignedOfferingLetterPage'
