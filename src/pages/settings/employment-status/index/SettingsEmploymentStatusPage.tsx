import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
import { Button, Spinner } from 'jobseeker-ui'
import MainCard from '@/components/Elements/MainCard'
import Table from '../components/Table'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'
import usePagination from '@/hooks/use-pagination'
import { organizationService } from '@/services'
import ErrorScreen from '@/components/Elements/ErrorScreen'
import { IJobType } from '@/types/oganizartion'
import { PaginationResponse } from '@/types/pagination'

const SettingsEmploymentStatusPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<PaginationResponse<IJobType>>()
  const [selectedEmploymentStatus, setSelectedEmploymentStatus] = useState<IJobType | null>(null)
  const [loadData, setLoadData] = useState(false)

  const pagination = usePagination({
    pathname: '/settings/job-level',
    totalPage: pageData?.totalPages || 0,
    params: {},
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setErrorMessage('')
      setIsLoading(true)
      try {
        const data = await organizationService.fetchJobTypes(
          {
            page: pagination.currentPage,
            size: 20,
          },
          signal,
        )
        setPageData(data)
      } catch (e: any) {
        if (e.message !== 'canceled') {
          setErrorMessage(e.response?.data?.meta?.message || e.message)
        }
      }
      setIsLoading(false)
      // setLoadData(false)
    }

    load(signal)

    return () => {
      controller.abort()
    }
  }, [loadData, pagination.currentPage])

  const handleSubmitSuccess = () => {
    setLoadData((loadData) => !loadData)
  }

  const openModal = (employmentStatus: IJobType | null = null) => {
    setSelectedEmploymentStatus(employmentStatus)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedEmploymentStatus(null)
  }

  if (errorMessage) return <ErrorScreen code={500} message={errorMessage} />

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Job Level' }]}
        title="Job Level"
        subtitle="Manage Your Job Level"
        actions={
          <>
            <Button onClick={() => openModal()} color="primary" className="ml-3">
              Add New Job Level
            </Button>
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={() => (
            <>
              <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <span className="block text-lg font-semibold">Job Level List</span>
                  <span className="block text-sm">
                    You have <span className="text-primary-600">30 Job Level</span> in this list
                  </span>
                </div>
              </div>
            </>
          )}
          body={
            isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Spinner className="h-10 w-10 text-primary-600" />
              </div>
            ) : pageData?.content && pageData.content.length > 0 ? (
              <Table items={pageData.content} onSubmitSuccess={handleSubmitSuccess} />
            ) : (
              <div className="flex items-center justify-center py-20">
                <p>No data available.</p>
              </div>
            )
          }
          footer={pagination.render()}
        />
      </Container>

      <Modal show={showModal} onClose={closeModal} employmentStatus={selectedEmploymentStatus} onSubmitSuccess={handleSubmitSuccess} />
    </>
  )
}

export default SettingsEmploymentStatusPage
