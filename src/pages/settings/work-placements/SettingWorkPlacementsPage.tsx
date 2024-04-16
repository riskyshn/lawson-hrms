import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { organizationService } from '@/services'
import { Button } from 'jobseeker-ui'
import { useCallback, useEffect, useState } from 'react'
import CardHeader from '../components/CardHeader'
import Table from './components/Table'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'

const SettingWorkPlacementsPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<IPaginationResponse<IWorkplacement>>()
  const [pageError, setPageError] = useState<any>()
  const [toUpdateSelected, setToUpdateSelected] = useState<IWorkplacement | null>(null)
  const [loadData, setLoadData] = useState(false)

  const pagination = usePagination({
    pathname: '/settings/work-placements',
    totalPage: pageData?.totalPages,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await organizationService.fetchWorkplacements({ page: pagination.currentPage, limit: 20 }, signal)
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
    (data: IWorkplacement) => {
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
        breadcrumb={[{ text: 'Settings' }, { text: 'Work Placements' }]}
        title="Work Placement"
        subtitle="Manage Your Company Work Placement"
        actions={
          <>
            <Button onClick={() => setShowCreateModal(true)} color="primary" className="ml-3">
              Add New Work Placement
            </Button>
          </>
        }
      />

      <CreateModal show={showCreateModal} onCreated={refreshPageData} onClose={() => setShowCreateModal(false)} />
      <EditModal item={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={handleUpdate} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={<CardHeader name="Work Placement" total={pageData?.totalElements} />}
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

export default SettingWorkPlacementsPage
