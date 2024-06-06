import type { IDepartment } from '@/types'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button, Container, MainCard, PageHeader } from 'jobseeker-ui'
import { useAsyncSearch, usePagination } from '@/hooks'
import { organizationService } from '@/services'
import CardHeader from '../components/CardHeader'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toUpdateSelected, setToUpdateSelected] = useState<IDepartment | null>(null)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')
  const { isLoading, onRefresh, pageData } = useAsyncSearch(organizationService.fetchDepartments, { limit: 20 }, search)

  const pagination = usePagination({
    params: { search },
    pathname: '/settings/divisions',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader
        actions={
          <Button color="primary" onClick={() => setShowCreateModal(true)}>
            Add New Division
          </Button>
        }
        breadcrumb={[{ text: 'Settings' }, { text: 'Divisions' }]}
        subtitle="Manage Your Company Division"
        title="Division"
      />

      <CreateModal onClose={() => setShowCreateModal(false)} onCreated={onRefresh} show={showCreateModal} />
      <EditModal item={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={onRefresh} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={
            <Table items={pageData?.content || []} loading={isLoading} onDeleted={onRefresh} setSelectedToUpdate={setToUpdateSelected} />
          }
          footer={pagination.render()}
          header={<CardHeader name="Division" onRefresh={onRefresh} total={pageData?.totalElements} />}
        />
      </Container>
    </>
  )
}

Component.displayName = 'SettingDivisionsPage'
