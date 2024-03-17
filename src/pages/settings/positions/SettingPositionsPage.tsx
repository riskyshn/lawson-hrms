import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { organizationService } from '@/services'
import { IPosition } from '@/types/oganizartion'
import { PaginationResponse } from '@/types/pagination'
import { Button } from 'jobseeker-ui'
import { useCallback, useEffect, useState } from 'react'
import CardHeader from '../components/CardHeader'
import Table from './components/Table'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'

const SettingPositionsPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<PaginationResponse<IPosition>>()
  const [pageError, setPageError] = useState<any>()
  const [toUpdateSelected, setToUpdateSelected] = useState<IPosition | null>(null)
  const [loadData, setLoadData] = useState(false)

  const pagination = usePagination({
    pathname: '/settings/positions',
    totalPage: pageData?.totalPages || 0,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await organizationService.fetchPositions({ page: pagination.currentPage, limit: 20 }, signal)
        setPageData(data)
        setIsLoading(false)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      }
    }

    load(signal)
    return () => controller.abort()
  }, [loadData, pagination.currentPage])

  const handleUpdate = useCallback(
    (data: IPosition) => {
      if (!pageData) return
      setPageData({ ...pageData, content: pageData.content.map((el) => (el.oid === data.oid ? data : el)) })
    },
    [pageData],
  )

  const refreshPageData = useCallback(() => setLoadData((value) => !value), [])

  if (pageError) throw pageError
  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Positions' }]}
        title="Position"
        subtitle="Manage Your Company Position"
        actions={
          <>
            <Button onClick={() => setShowCreateModal(true)} color="primary" className="ml-3">
              Add New Position
            </Button>
          </>
        }
      />

      <CreateModal show={showCreateModal} onCreated={refreshPageData} onClose={() => setShowCreateModal(false)} />
      <EditModal item={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={handleUpdate} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={<CardHeader name="Position" total={pageData?.totalElements} />}
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              setSelectedToUpdate={setToUpdateSelected}
              onDeleted={refreshPageData}
            />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default SettingPositionsPage
