import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
// import { Button, Spinner } from 'jobseeker-ui'
import MainCard from '@/components/Elements/MainCard'
import Table from '../components/Table'
// import Modal from '../components/Modal'
// import { useEffect, useState } from 'react'
// import usePagination from '@/hooks/use-pagination'
// import { organizationService } from '@/services'
// import ErrorScreen from '@/components/Elements/ErrorScreen'

const SettingsDocumentRequestPage: React.FC = () => {
  const pageData = {
    content: [
      {
        document: 'KTP',
        fileType: ['JPG/PNG/JPEG'],
      },
      {
        document: 'Ijazah',
        fileType: ['PDF'],
      },
      {
        document: 'KTP',
        fileType: ['JPG/PNG/JPEG'],
      },
      {
        document: 'Ijazah',
        fileType: ['PDF'],
      },
      {
        document: 'KTP',
        fileType: ['JPG/PNG/JPEG', 'PDF'],
      },
    ],
  }

  // const [showModal, setShowModal] = useState(false)
  // const [errorMessage, setErrorMessage] = useState('')
  // const [isLoading, setIsLoading] = useState(true)
  // const [pageData, setPageData] = useState<IPaginationResponse<IDocumentRequest>>()
  // const [selectedDocumentRequest, setSelectedDocumentRequest] = useState<IDocumentRequest | null>(null)
  // const [loadData, setLoadData] = useState(false)

  // const pagination = usePagination({
  //   pathname: '/settings/document-request',
  //   totalPage: pageData?.totalPages ?? 0,
  //   params: {},
  // })

  // useEffect(() => {
  //   const controller = new AbortController()
  //   const signal = controller.signal

  //   const load = async (signal: AbortSignal) => {
  //     setErrorMessage('')
  //     setIsLoading(true)
  //     try {
  //       const data = await organizationService.fetchDocumentRequests(
  //         {
  //           page: pagination.currentPage,
  //           limit: 20,
  //         },
  //         signal,
  //       )
  //       setPageData(data)
  //     } catch (e: any) {
  //       if (e.message !== 'canceled') {
  //         setErrorMessage(e.response?.data?.meta?.message || e.message)
  //       }
  //     }
  //     setIsLoading(false)
  //   }

  //   load(signal)

  //   return () => {
  //     controller.abort()
  //   }
  // }, [loadData, pagination.currentPage])

  const handleSubmitSuccess = () => {
    // setLoadData((loadData) => !loadData)
  }

  // const openModal = (documentRequest: IDocumentReqest | null = null) => {
  //   setSelectedDocumentRequest(documentRequest)
  //   setShowModal(true)
  // }

  // const openModal = () => {
  //   // setShowModal(true)
  // }

  // // const closeModal = () => {
  // //   setShowModal(false)
  // //   setSelectedDocumentRequest(null)
  // // }

  // const closeModal = () => {
  //   // setShowModal(false)
  // }

  // if (errorMessage) return <ErrorScreen code={500} message={errorMessage} />

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Document Request' }]}
        title="Document Request"
        subtitle="Manage Your Document Request"
        actions={
          <>
            {/* <Button onClick={() => openModal()} color="primary" className="ml-3">
              Add New Document Request
            </Button> */}
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={() => (
            <>
              <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <span className="block text-lg font-semibold">Document Request List</span>
                  <span className="block text-sm">
                    You have <span className="text-primary-600">{pageData?.content?.length ?? 0} Document Request</span> in this list
                  </span>
                </div>
              </div>
            </>
          )}
          body={
            // isLoading ? (
            //   <div className="flex items-center justify-center py-20">
            //     <Spinner className="h-10 w-10 text-primary-600" />
            //   </div>
            // ) : pageData?.content && pageData.content.length > 0 ? (
            //   <Table items={pageData.content} onSubmitSuccess={handleSubmitSuccess} />
            // ) : (
            //   <div className="flex items-center justify-center py-20">
            //     <p>No data available.</p>
            //   </div>
            // )
            <Table items={pageData.content} onSubmitSuccess={handleSubmitSuccess} />
          }
          // footer={pagination.render()}
          footer={0}
        />
      </Container>

      {/* <Modal show={showModal} onClose={closeModal} position={selectedPosition} onSubmitSuccess={handleSubmitSuccess} /> */}
      {/* <Modal show={showModal} onClose={closeModal} onSubmitSuccess={handleSubmitSuccess} /> */}
    </>
  )
}

export default SettingsDocumentRequestPage
