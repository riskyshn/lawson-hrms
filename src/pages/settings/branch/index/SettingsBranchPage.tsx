import PageHeader from '@/components/Elements/PageHeader'
import Container from '@/components/Elements/Container'
import { Button, Spinner } from 'jobseeker-ui'
import MainCard from '@/components/Elements/MainCard'
import Table from '../components/Table'
import Modal from '../components/Modal'
import { useEffect, useState } from 'react'
import usePagination from '@/hooks/use-pagination'
import { IBranch } from '@/types/oganizartion'
import { SpringPaginationResponse } from '@/types/pagination'
import { organizationService } from '@/services'
import ErrorScreen from '@/components/Elements/ErrorScreen'

const SettingsBranchPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<SpringPaginationResponse<IBranch>>()
  const [selectedBranch, setSelectedBranch] = useState<IBranch | null>(null)

  const pagination = usePagination({
    pathname: '/settings/branch',
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
        const data = await organizationService.fetchBranches(
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
  }, [pagination.currentPage])

  const openModal = (branch: IBranch | null = null) => {
    setSelectedBranch(branch)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedBranch(null)
  }

  if (errorMessage) return <ErrorScreen code={500} message={errorMessage} />

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Branch' }]}
        title="Branch"
        subtitle="Manage Your Branch"
        actions={
          <>
            <Button onClick={() => openModal()} color="primary" className="ml-3">
              Add New Branch
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
                  <span className="block text-lg font-semibold">Branch List</span>
                  <span className="block text-sm">
                    You have <span className="text-primary-600">30 Branch</span> in this list
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
              <Table items={pageData.content} />
            ) : (
              <div className="flex items-center justify-center py-20">
                <p>No data available.</p>
              </div>
            )
          }
          footer={pagination.render()}
        />
      </Container>

      <Modal show={showModal} onClose={closeModal} branch={selectedBranch} />
    </>
  )
}

export default SettingsBranchPage
