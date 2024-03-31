import Container from '@/components/Elements/Container'
import PageHeader from '@/components/Elements/PageHeader'
import { organizationService, processService } from '@/services'
import { Spinner, Stepper, useSteps, useToast } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useNavigate, useParams, useSearchParams } from 'react-router-dom'
import UploadDocument from './components/UploadDocument'
import { axiosErrorMessage } from '@/utils/axios'

const UploadDocumentsPage = () => {
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
        const [documentRequestsData, oldDocumentsData] = await Promise.all([
          organizationService.fetchDocumentRequests({ limit: 9999 }),
          isEdit ? processService.getDocumentRequest(applicantId) : Promise.resolve(undefined),
        ])

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
  const { activeStep, isLastStep, isFirstStep, handlePrev, handleNext } = useSteps(documentRequests?.length || 0)

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
          <Spinner height={40} className="text-primary-600" />
        </div>
      )}

      {documentRequests && (
        <Container className="flex flex-col gap-3 py-3 xl:pb-8">
          <Stepper
            activeStep={activeStep}
            steps={documentRequests.map((el) => ({ title: el.name, details: el.allowedFileTypes.join(', ') }))}
          />

          {documentRequests.map((item, index) =>
            activeStep === index ? (
              <UploadDocument
                key={index}
                link={formValues[item.oid] || ''}
                isFirst={isFirstStep}
                isLast={isLastStep}
                isLoading={isLoading}
                handlePrev={handlePrev}
                handleSubmit={(link) => handleStepSubmit({ ...formValues, [item.oid]: link })}
              />
            ) : null,
          )}
        </Container>
      )}
    </>
  )
}

export default UploadDocumentsPage
