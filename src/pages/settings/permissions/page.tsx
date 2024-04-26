import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import usePagination from '@/core/hooks/use-pagination'
import { authorityService } from '@/services'
import { Button } from 'jobseeker-ui'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CardHeader from '../components/CardHeader'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toUpdateSelected, setToUpdateSelected] = useState<IPermission | null>(null)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')

  const { pageData, isLoading, onRefresh } = useAsyncSearch(authorityService.fetchPermissions, { limit: 20 }, search)

  const pagination = usePagination({
    pathname: '/settings/permissions',
    totalPage: pageData?.totalPages,
    params: { search },
  })
  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Permissions' }]}
        title="Permission"
        subtitle="Manage Your Company Permission"
        actions={
          <Button onClick={() => setShowCreateModal(true)} color="primary" className="ml-3">
            Add New Permission
          </Button>
        }
      />

      <CreateModal show={showCreateModal} onCreated={onRefresh} onClose={() => setShowCreateModal(false)} />
      <EditModal permission={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={onRefresh} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={<CardHeader name="Permission" total={pageData?.totalElements} onRefresh={onRefresh} />}
          body={
            <Table items={pageData?.content || []} loading={isLoading} setSelectedToUpdate={setToUpdateSelected} onDeleted={onRefresh} />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

Component.displayName = 'SettingPermissionsPage'
