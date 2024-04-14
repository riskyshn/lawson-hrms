import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { authorityService } from '@/services'
import { Button } from 'jobseeker-ui'
import { useCallback, useEffect, useState } from 'react'
import CardHeader from '../components/CardHeader'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'
import Table from './components/Table'
import useAsyncSearch from '@/hooks/use-async-search'
import { useSearchParams } from 'react-router-dom'

const SettingPermissionsPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toUpdateSelected, setToUpdateSelected] = useState<IPermission | null>(null)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')
  const page = searchParams.get('page')

  const { pageData, isLoading, onRefresh } = useAsyncSearch<IPermission>({
    action: authorityService.fetchPermissions,
    params: { limit: 20, page },
    input: search || '',
  })

  const pagination = usePagination({
    pathname: '/settings/permissions',
    totalPage: pageData?.totalPages || 0,
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

export default SettingPermissionsPage
