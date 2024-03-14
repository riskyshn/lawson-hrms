import Container from '@/components/Elements/Container'
import ErrorScreen from '@/components/Elements/ErrorScreen'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { organizationService } from '@/services'
import { IPosition } from '@/types/oganizartion'
import { PaginationResponse } from '@/types/pagination'
import { Button, Spinner } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import Modal from './components/Modal'
import Table from './components/Table'

const SettingsRolePage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<PaginationResponse<IPosition>>()
  const [selectedPosition, setSelectedPosition] = useState<IPosition | null>(null)
  const [loadData, setLoadData] = useState(false)

  const pagination = usePagination({
    pathname: '/settings/position',
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
        const data = await organizationService.fetchPositions(
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
    }

    load(signal)

    return () => {
      controller.abort()
    }
  }, [loadData, pagination.currentPage])

  const handleSubmitSuccess = () => {
    setLoadData((loadData) => !loadData)
  }

  const openModal = (position: IPosition | null = null) => {
    setSelectedPosition(position)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedPosition(null)
  }

  if (errorMessage) return <ErrorScreen code={500} message={errorMessage} />

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Role' }]}
        title="Role"
        subtitle="Manage Your Role"
        actions={
          <>
            <Button onClick={() => openModal()} color="primary" className="ml-3">
              Add New Role
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
                  <span className="block text-lg font-semibold">Position List</span>
                  <span className="block text-sm">
                    You have <span className="text-primary-600">30 Position</span> in this list
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

      <Modal show={showModal} onClose={closeModal} position={selectedPosition} onSubmitSuccess={handleSubmitSuccess} />
    </>
  )
}

export default SettingsRolePage
