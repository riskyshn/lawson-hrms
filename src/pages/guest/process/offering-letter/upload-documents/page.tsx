import DocumentFileUpload from '@/components/Elements/FileUploads/DocumentFileUpload'
import ImageFileUpload from '@/components/Elements/FileUploads/ImageFileUpload'
import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncAction from '@/core/hooks/use-async-action'
import PageHeader from '@/pages/guest/components/PageHeader'
import { organizationService, processService } from '@/services'
import { axiosErrorMessage } from '@/utils/axios'
import { yupResolver } from '@hookform/resolvers/yup'
import { Button, Card, CardBody, CardFooter, InputWrapper, useToast } from 'jobseeker-ui'
import { CheckCircleIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSearchParams } from 'react-router-dom'
import * as yup from 'yup'

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

  if (!token || !applicantId) throw { status: 419, hideLayout: true, message: 'This page url is invalid.' }

  const [documentRequests, documentRequestsLoading] = useAsyncAction(
    organizationService.fetchDocumentRequests,
    { limit: 9999 },
    { headers: { Authorization: 'Bearer ' + token } },
  )

  const [oldDocuments, oldDocumentLoading] = useAsyncAction(processService.getDocumentRequest, applicantId, {
    headers: { Authorization: 'Bearer ' + token },
  })

  const {
    handleSubmit,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      applicantId,
    },
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
    console.log(data)
  })

  return (
    <>
      <PageHeader subTitle="Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure neque quasi expedita. Architecto debitis provident vero repudiandae asperiores iste doloremque laborum nesciunt mollitia. Quas minus blanditiis sequi consequatur temporibus corrupti!">
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
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam odit incidunt hic numquam iure quibusdam quod animi rerum
                ratione expedita totam, sapiente possimus, placeat corporis eum. Voluptatem esse cupiditate ipsa.
              </p>
            </CardBody>
          )}

          {!success &&
            !oldDocumentLoading &&
            !documentRequestsLoading &&
            documentRequests?.content.map((el, index) => (
              <CardBody key={index}>
                <InputWrapper label={el.name} labelRequired error={errors.documents?.[index]?.link?.message}>
                  {el.allowedFileTypes.some((type) => ['png', 'jpg', 'pdf', 'jpeg', 'webp'].includes(type)) ? (
                    <ImageFileUpload
                      type="employee-national-id"
                      value={getValues(`documents.${index}.link`)}
                      error={errors.documents?.[index]?.link?.message}
                      onStart={() => {
                        setValue(`documents.${index}.link`, PROGRESS_KEY)
                      }}
                      onChange={(value) => {
                        setValue(`documents.${index}.link`, value)
                        trigger(`documents.${index}.link`)
                      }}
                      onError={(message) => {
                        setValue(`documents.${index}.link`, ERROR_PREFIX_KEY + message)
                        trigger(`documents.${index}.link`)
                      }}
                    />
                  ) : (
                    <DocumentFileUpload
                      type="applicant-result"
                      value={getValues(`documents.${index}.link`)}
                      error={errors.documents?.[index]?.link?.message}
                      onStart={() => {
                        setValue(`documents.${index}.link`, PROGRESS_KEY)
                      }}
                      onChange={(value) => {
                        setValue(`documents.${index}.link`, value)
                        trigger(`documents.${index}.link`)
                      }}
                      onError={(message) => {
                        setValue(`documents.${index}.link`, ERROR_PREFIX_KEY + message)
                        trigger(`documents.${index}.link`)
                      }}
                    />
                  )}
                </InputWrapper>
              </CardBody>
            ))}
          {!success && (
            <CardFooter>
              <Button type="submit" className="min-w-24" color="primary" disabled={loading} loading={loading}>
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
