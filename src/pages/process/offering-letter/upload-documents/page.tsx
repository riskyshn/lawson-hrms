import type { IDocumentRequest } from '@/types'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { Container, PageHeader, Spinner, Stepper, useSteps, useToast } from 'jobseeker-ui'
import { organizationService, processService } from '@/services'
import { axiosErrorMessage } from '@/utils'
import UploadDocument from './components/UploadDocument'

export const Component: React.FC = () => {
  const [documentRequests, setDocumentRequests] = useState<IDocumentRequest[]>()
  const [errorPage, setErrorPage] = useState<any>()
  const { applicantId } = useParams()
  const [searchParams] = useSearchParams()

  const isEdit = searchParams.get('edit') === 'true'

  const navigate = useNavigate()
  const toast = useToast()

  useEffect(() => {
    if (!applicantId) return

    const load = async () => {
      try {
        const documentRequestsData = await organizationService.fetchDocumentRequests({ limit: 9999 })
        let oldDocumentsData = undefined

        if (isEdit) {
          oldDocumentsData = await processService
            .getDocumentRequest(applicantId)
            .catch((e) => console.error('Failed to get document request', e))
        }

        setDocumentRequests(documentRequestsData.content)

        if (!oldDocumentsData) return

        const obj: Record<string, string> = {}

        for (const doc of oldDocumentsData) {
          obj[doc.document.oid] = doc.file.link
        }

        setFormValues(obj)
      } catch (e) {
        setErrorPage(e)
      }
    }

    load()
  }, [isEdit, applicantId])

  const [formValues, setFormValues] = useState<Record<string, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const { activeStep, handleNext, handlePrev, isFirstStep, isLastStep } = useSteps(documentRequests?.length || 0)

  const handleStepSubmit = async (data: any) => {
    setFormValues(data)
    handleNext()

    if (!isLastStep) return

    setIsLoading(true)
    try {
      await processService.uploadDocumentRequest({
        applicantId,
        documents: Object.keys(data).map((oid) => ({
          documentId: oid,
          link: data[oid],
        })),
      })
      toast('Upload document requests successfully created.', { color: 'success' })
      navigate(`/process/offering-letter`)
    } catch (error) {
      toast(axiosErrorMessage(error), { color: 'error' })
      setIsLoading(false)
    }
  }

  if (errorPage) throw errorPage

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Process' }, { text: 'Offering Letter' }, { text: isEdit ? 'Edit Documents' : 'Upload Documents' }]}
        title={isEdit ? 'Edit Documents' : 'Upload Documents'}
      />

      {!documentRequests && (
        <div className="flex items-center justify-center py-48">
          <Spinner className="text-primary-600" height={40} />
        </div>
      )}

      {documentRequests && (
        <Container className="flex flex-col gap-3 py-3 xl:pb-8">
          <Stepper
            activeStep={activeStep}
            steps={documentRequests.map((el) => ({ details: el.allowedFileTypes.join(', '), title: el.name }))}
          />

          {documentRequests.map((item, index) =>
            activeStep === index ? (
              <UploadDocument
                allowedFileTypes={item.allowedFileTypes}
                handlePrev={handlePrev}
                handleSubmit={(link) => handleStepSubmit({ ...formValues, [item.oid]: link })}
                isFirst={isFirstStep}
                isLast={isLastStep}
                isLoading={isLoading}
                key={index}
                link={formValues[item.oid] || ''}
              />
            ) : null,
          )}
        </Container>
      )}
    </>
  )
}

Component.displayName = 'UploadDocumentsPage'
