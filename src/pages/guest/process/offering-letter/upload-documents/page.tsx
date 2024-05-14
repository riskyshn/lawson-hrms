import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, InputWrapper, useToast } from '@jshrms/ui'
import { CheckCircleIcon } from 'lucide-react'
import * as yup from 'yup'
import DocumentFileUpload from '@/components/Elements/FileUploads/DocumentFileUpload'
import ImageFileUpload from '@/components/Elements/FileUploads/ImageFileUpload'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncAction from '@/core/hooks/use-async-action'
import PageHeader from '@/pages/guest/components/PageHeader'
import { organizationService, processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'

const PROGRESS_KEY = '[PROGRESS]'
const ERROR_PREFIX_KEY = '[ERROR]'

const schema = yup.object({
  applicantId: yup.string().required(),
  documents: yup.array().of(
    yup.object({
      documentId: yup.string().required(),
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
    }),
  ),
})

export const Component: React.FC = () => {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')
  const applicantId = searchParams.get('applicantId')
  const [documentRequestsAdded, setDocumentRequestsAdded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const toast = useToast()

  if (!token || !applicantId) throw { hideLayout: true, message: 'This page url is invalid.', status: 419 }

  const options = { headers: { Authorization: 'Bearer ' + token } }

  const [documentRequests, documentRequestsLoading] = useAsyncAction(organizationService.fetchDocumentRequests, { limit: 9999 }, options)
  const [oldDocuments, oldDocumentLoading] = useAsyncAction(processService.getDocumentRequest, applicantId, options)
  const [company] = useAsyncAction(organizationService.fetchCompany, options)

  const {
    formState: { errors },
    getValues,
    handleSubmit,
    setValue,
    trigger,
  } = useForm({
    defaultValues: {
      applicantId,
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    if (!documentRequestsAdded && oldDocuments) {
      setDocumentRequestsAdded(true)
      oldDocuments.forEach((el, index) => {
        setValue(`documents.${index}.link`, el.file.link)
      })
    }
  }, [documentRequestsAdded, oldDocuments, setValue])

  useEffect(() => {
    documentRequests?.content.forEach((el, index) => {
      setValue(`documents.${index}.documentId`, el.oid)
    })
  }, [documentRequests, setValue])

  const onSubmit = handleSubmit(async (data) => {
    setLoading(true)
    try {
      await processService.uploadDocumentRequest(data, { headers: { Authorization: 'Bearer ' + token } })
      toast('Success fully upload documents', { color: 'success' })
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
          company?.name
            ? `${company.name} has requested you to upload certain documents in order to continue the recruitment process. Please submit the documents accordingly.`
            : ''
        }
      >
        Upload Documents
      </PageHeader>

      <div className="container relative z-10 mx-auto -mt-6 mb-3 max-w-5xl px-3">
        <Card<'form'> as="form" onSubmit={onSubmit}>
          {<LoadingScreen show={oldDocumentLoading && documentRequestsLoading} />}

          {success && (
            <CardBody className="flex flex-col items-center justify-center gap-3 py-16 text-center">
              <CheckCircleIcon className="block h-28 w-28 text-success-600" strokeWidth={1} />
              <h1 className="text-3xl">Thank you!</h1>
              <p className="max-w-2xl">
                Thank you for submitting the required documents. This step is crucial in the recruitment process. Your documents will be
                reviewed thoroughly and in a timely manner. We appreciate your cooperation
              </p>
            </CardBody>
          )}

          {!success &&
            !oldDocumentLoading &&
            !documentRequestsLoading &&
            documentRequests?.content.map((el, index) => (
              <CardBody key={index}>
                <InputWrapper error={errors.documents?.[index]?.link?.message} label={el.name} labelRequired>
                  {el.allowedFileTypes.some((type) => ['jpeg', 'jpg', 'pdf', 'png', 'webp'].includes(type)) ? (
                    <ImageFileUpload
                      error={errors.documents?.[index]?.link?.message}
                      onChange={(value) => {
                        setValue(`documents.${index}.link`, value)
                        trigger(`documents.${index}.link`)
                      }}
                      onError={(message) => {
                        setValue(`documents.${index}.link`, ERROR_PREFIX_KEY + message)
                        trigger(`documents.${index}.link`)
                      }}
                      onStart={() => {
                        setValue(`documents.${index}.link`, PROGRESS_KEY)
                      }}
                      type="employee-national-id"
                      value={getValues(`documents.${index}.link`)}
                    />
                  ) : (
                    <DocumentFileUpload
                      error={errors.documents?.[index]?.link?.message}
                      onChange={(value) => {
                        setValue(`documents.${index}.link`, value)
                        trigger(`documents.${index}.link`)
                      }}
                      onError={(message) => {
                        setValue(`documents.${index}.link`, ERROR_PREFIX_KEY + message)
                        trigger(`documents.${index}.link`)
                      }}
                      onStart={() => {
                        setValue(`documents.${index}.link`, PROGRESS_KEY)
                      }}
                      type="applicant-result"
                      value={getValues(`documents.${index}.link`)}
                    />
                  )}
                </InputWrapper>
              </CardBody>
            ))}
          {!success && (
            <CardFooter>
              <Button className="min-w-24" color="primary" disabled={loading} loading={loading} type="submit">
                {oldDocuments ? 'Update' : 'Submit'}
              </Button>
            </CardFooter>
          )}
        </Card>
      </div>
    </>
  )
}

Component.displayName = 'UploadDocumentsPage'
