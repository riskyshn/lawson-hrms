import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, InputWrapper, useToast } from 'jobseeker-ui'
import { CheckCircleIcon } from 'lucide-react'
import * as yup from 'yup'
import DocumentFileUpload from '@/components/Elements/FileUploads/DocumentFileUpload'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncAction from '@/core/hooks/use-async-action'
import PageHeader from '@/pages/guest/components/PageHeader'
import { candidateService, organizationService, processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  applicantId: yup.string().required(),
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

export const Component: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const applicantId = searchParams.get('applicantId')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string>()
  const toast = useToast()

  if (!token || !applicantId) throw { hideLayout: true, message: 'This page url is invalid.', status: 419 }
  const config = { headers: { Authorization: 'Bearer ' + token } }

  const [company] = useAsyncAction(organizationService.fetchCompany, config)
  const [candidate] = useAsyncAction(candidateService.fetchCandidateToCreateEmployeeByApplicanId, applicantId, config)
  const [preview] = useAsyncAction(processService.previewOfferingLetter, applicantId, {
    headers: { Accept: 'application/pdf', ...config.headers },
  })

  useEffect(() => {
    const onPreview = async () => {
      if (!preview) return
      try {
        const blob = new Blob([preview.data], { type: 'application/pdf' })
        const url = URL.createObjectURL(blob)
        setPreviewUrl(url)
      } catch (e) {
        toast(axiosErrorMessage(e), { color: 'error' })
      }
    }
    onPreview()
  }, [preview, toast])

  const onDownload = async () => {
    if (!preview) return
    try {
      const blob = new Blob([preview.data], { type: 'application/pdf' })
      const link = document.createElement('a')
      link.href = window.URL.createObjectURL(blob)
      link.download = `offering-letter-${+new Date()}.pdf`
      link.click()
      window.URL.revokeObjectURL(link.href)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
  }

  const {
    handleSubmit,
    formState: { errors },
    getValues,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      applicantId,
    },
    resolver: yupResolver(schema),
  })

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      await processService.uploadSignedOfferingLetter(data, { headers: { Authorization: 'Bearer ' + token } })
      toast('Success fully upload signed offering letter.', { color: 'success' })
      setSuccess(true)
    } catch (e) {
      toast(axiosErrorMessage(e), { color: 'error' })
    }
    setLoading(false)
  })

  return (
    <>
      <PageHeader
        subTitle={
          candidate && company
            ? `Congratulations! ${candidate?.name}, ${company?.name} has sent you an offering letter for the position ${candidate?.position?.name}, Please submit a signed version of the offering letter document in order to continue with the recruitment process.`
            : ''
        }
      >
        Upload Signed
      </PageHeader>

      <div className="container relative z-10 mx-auto -mt-6 mb-3 flex max-w-5xl flex-col gap-3 px-3 pb-3">
        {success && (
          <Card>
            <CardBody className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <CheckCircleIcon className="block h-28 w-28 text-success-600" strokeWidth={1} />
              <h1 className="text-3xl">Thank you!</h1>
              <p className="max-w-2xl">
                Thank you for submitting the signed document. This step is pivotal in the recruitment process. Your document will be
                carefully reviewed in a timely manner. We appreciate your cooperation.
              </p>
            </CardBody>
          </Card>
        )}
        {!success && (
          <>
            <Card className="flex aspect-square flex-col overflow-hidden border-none">
              <LoadingScreen className="flex-1" show={!previewUrl} spinnerSize={80} />
              {previewUrl && <iframe className="block flex-1" src={previewUrl} />}
              <CardFooter>
                <Button color="primary" onClick={onDownload}>
                  Download
                </Button>
              </CardFooter>
            </Card>

            <Card as="form" onSubmit={onSubmit}>
              <CardBody>
                <InputWrapper label="Upload signed offering letter." labelRequired>
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
                </InputWrapper>
              </CardBody>

              <CardFooter>
                <Button className="min-w-24" color="primary" disabled={loading} loading={loading} type="submit">
                  Submit
                </Button>
              </CardFooter>
            </Card>
          </>
        )}
      </div>
    </>
  )
}

Component.displayName = 'PreviewOfferingLetterPage'
