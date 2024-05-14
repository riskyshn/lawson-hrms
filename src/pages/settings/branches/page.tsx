import type { IBranch } from '@/types'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '@jshrms/ui'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import usePagination from '@/core/hooks/use-pagination'
import { organizationService } from '@/services'
import CardHeader from '../components/CardHeader'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toUpdateSelected, setToUpdateSelected] = useState<IBranch | null>(null)

  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')
  const { isLoading, onRefresh, pageData } = useAsyncSearch(organizationService.fetchBranches, { limit: 20 }, search)

  const pagination = usePagination({
    params: { search },
    pathname: '/settings/branches',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader
        actions={
          <Button color="primary" onClick={() => setShowCreateModal(true)}>
            Add New Branch
          </Button>
        }
        breadcrumb={[{ text: 'Settings' }, { text: 'Branches' }]}
        subtitle="Manage Your Company Branch"
        title="Branch"
      />

      <CreateModal onClose={() => setShowCreateModal(false)} onCreated={onRefresh} show={showCreateModal} />
      <EditModal item={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={onRefresh} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={
            <Table items={pageData?.content || []} loading={isLoading} onDeleted={onRefresh} setSelectedToUpdate={setToUpdateSelected} />
          }
          footer={pagination.render()}
          header={<CardHeader name="Branch" onRefresh={onRefresh} total={pageData?.totalElements} />}
        />
      </Container>
    </>
  )
}

Component.displayName = 'SettingBranchesPage'
