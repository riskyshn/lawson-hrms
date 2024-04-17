import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { organizationService } from '@/services'
import { Button } from 'jobseeker-ui'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CardHeader from '../components/CardHeader'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'
import Table from './components/Table'

const SettingWorkPlacementsPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toUpdateSelected, setToUpdateSelected] = useState<IWorkplacement | null>(null)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')

  const { pageData, isLoading, onRefresh } = useAsyncSearch(organizationService.fetchWorkplacements, { limit: 20 }, search)

  const pagination = usePagination({
    pathname: '/settings/work-placements',
    totalPage: pageData?.totalPages,
    params: { search },
  })
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

      <CreateModal show={showCreateModal} onCreated={onRefresh} onClose={() => setShowCreateModal(false)} />
      <EditModal item={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={onRefresh} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={<CardHeader name="Work Placement" total={pageData?.totalElements} onRefresh={onRefresh} />}
          body={
            <Table items={pageData?.content || []} loading={isLoading} setSelectedToUpdate={setToUpdateSelected} onDeleted={onRefresh} />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default SettingWorkPlacementsPage
