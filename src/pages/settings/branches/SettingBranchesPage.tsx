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

const SettingBranchesPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toUpdateSelected, setToUpdateSelected] = useState<IBranch | null>(null)

  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')
  const page = searchParams.get('page')

  const { pageData, isLoading, onRefresh } = useAsyncSearch<IPreviousEmployee>({
    action: organizationService.fetchBranches,
    params: { limit: 20, page },
    input: search || '',
  })

  const pagination = usePagination({
    pathname: '/settings/branches',
    totalPage: pageData?.totalPages || 0,
    params: { search },
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Branches' }]}
        title="Branch"
        subtitle="Manage Your Company Branch"
        actions={
          <Button onClick={() => setShowCreateModal(true)} color="primary">
            Add New Branch
          </Button>
        }
      />

      <CreateModal show={showCreateModal} onCreated={onRefresh} onClose={() => setShowCreateModal(false)} />
      <EditModal item={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={onRefresh} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={<CardHeader name="Branch" total={pageData?.totalElements} onRefresh={onRefresh} />}
          body={
            <Table items={pageData?.content || []} loading={isLoading} setSelectedToUpdate={setToUpdateSelected} onDeleted={onRefresh} />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default SettingBranchesPage
