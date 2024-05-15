import type { IJobType } from '@/types'
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
  const [toUpdateSelected, setToUpdateSelected] = useState<IJobType | null>(null)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')

  const { isLoading, onRefresh, pageData } = useAsyncSearch(organizationService.fetchJobTypes, { limit: 20 }, search)

  const pagination = usePagination({
    params: { search },
    pathname: '/settings/employment-status',
    totalPage: pageData?.totalPages,
  })
  return (
    <>
      <PageHeader
        actions={
          <Button className="ml-3" color="primary" onClick={() => setShowCreateModal(true)}>
            Add New Employment Status
          </Button>
        }
        breadcrumb={[{ text: 'Settings' }, { text: 'Employment Status' }]}
        subtitle="Manage Your Company Employment Status"
        title="Employment Status"
      />

      <CreateModal onClose={() => setShowCreateModal(false)} onCreated={onRefresh} show={showCreateModal} />
      <EditModal item={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={onRefresh} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={
            <Table items={pageData?.content || []} loading={isLoading} onDeleted={onRefresh} setSelectedToUpdate={setToUpdateSelected} />
          }
          footer={pagination.render()}
          header={<CardHeader name="Employment Status" onRefresh={onRefresh} total={pageData?.totalElements} />}
        />
      </Container>
    </>
  )
}

Component.displayName = 'SettingEmploymentStatusPage'
