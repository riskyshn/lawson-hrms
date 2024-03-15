import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
import { Button, Spinner } from 'jobseeker-ui'
import MainCard from '@/components/Elements/MainCard'
import Table from '../components/Table'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'
import usePagination from '@/hooks/use-pagination'
import { IWorkplacement } from '@/types/oganizartion'
import { organizationService } from '@/services'
import ErrorScreen from '@/components/Elements/ErrorScreen'
import { PaginationResponse } from '@/types/pagination'

const SettingsWorkPlacementPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<PaginationResponse<IWorkplacement>>()
  const [selectedWorkPlacement, setSelectedWorkPlacement] = useState<IWorkplacement | null>(null)
  const [loadData, setLoadData] = useState(false)

  const pagination = usePagination({
    pathname: '/settings/workplacement',
    totalPage: pageData?.totalPages ?? 0,
    params: {},
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setErrorMessage('')
      setIsLoading(true)
      try {
        const data = await organizationService.fetchWorkplacements(
          {
            page: pagination.currentPage,
            limit: 20,
          },
          signal,
        )
        setPageData(data)
        setIsLoading(false)
      } catch (e: any) {
        if (e.message !== 'canceled') {
          const errorMessage = e.response?.data?.meta?.message || e.message
          setErrorMessage(errorMessage)
          setIsLoading(false)
        }
      }
    }

    load(signal)

    return () => {
      controller.abort()
    }
  }, [loadData, pagination.currentPage])

  const handleSubmitSuccess = () => {
    setLoadData((loadData) => !loadData)
  }

  const openModal = (position: IWorkplacement | null = null) => {
    setSelectedWorkPlacement(position)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedWorkPlacement(null)
  }

  if (errorMessage) return <ErrorScreen code={500} message={errorMessage} />

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Work Placement' }]}
        title="Work Placement"
        subtitle="Manage Your Work Placement"
        actions={
          <>
            <Button onClick={() => openModal()} color="primary" className="ml-3">
              Add New Work Placement
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
                  <span className="block text-lg font-semibold">Work Placement List</span>
                  <span className="block text-sm">
                    You have <span className="text-primary-600">{pageData?.content?.length ?? 0} Work Placement</span> in this list
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

      <Modal show={showModal} onClose={closeModal} workPlacement={selectedWorkPlacement} onSubmitSuccess={handleSubmitSuccess} />
    </>
  )
}

export default SettingsWorkPlacementPage
