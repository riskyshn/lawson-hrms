import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import DocumentFileUpload from '@/components/Elements/FileUploads/DocumentFileUpload'
import { processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, InputWrapper, useToast } from 'jobseeker-ui'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import * as yup from 'yup'

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

const UploadSignedOfferingLetterPage: React.FC = () => {
  const { applicantId } = useParams()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const toast = useToast()

  const {
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
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
            <InputWrapper label="Document" labelRequired error={errors.file?.message}>
              <DocumentFileUpload
                type="applicant-result"
                value={getValues('file')}
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
          </CardBody>

          <CardFooter className="gap-3">
            <Button as={Link} to="/process/offering-letter" color="error" variant="light" className="w-32">
              Cancel
            </Button>
            <Button type="submit" color="primary" className="w-32" disabled={loading} loading={loading}>
              Submit
            </Button>
          </CardFooter>
        </Card>
      </Container>
    </>
  )
}

export default UploadSignedOfferingLetterPage
