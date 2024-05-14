import type { IPermission } from '@jshrms/shared/types'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Container from '@jshrms/shared/components/Elements/Layout/Container'
import MainCard from '@jshrms/shared/components/Elements/Layout/MainCard'
import PageHeader from '@jshrms/shared/components/Elements/Layout/PageHeader'
import { useAsyncSearch, usePagination } from '@jshrms/shared/hooks'
import { authorityService } from '@jshrms/shared/services'
import { Button } from '@jshrms/ui'
import CardHeader from '../components/CardHeader'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toUpdateSelected, setToUpdateSelected] = useState<IPermission | null>(null)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')

  const { isLoading, onRefresh, pageData } = useAsyncSearch(authorityService.fetchPermissions, { limit: 20 }, search)

  const pagination = usePagination({
    params: { search },
    pathname: '/settings/permissions',
    totalPage: pageData?.totalPages,
  })
  return (
    <>
      <PageHeader
        actions={
          <Button className="ml-3" color="primary" onClick={() => setShowCreateModal(true)}>
            Add New Permission
          </Button>
        }
        breadcrumb={[{ text: 'Settings' }, { text: 'Permissions' }]}
        subtitle="Manage Your Company Permission"
        title="Permission"
      />

      <CreateModal onClose={() => setShowCreateModal(false)} onCreated={onRefresh} show={showCreateModal} />
      <EditModal onClose={() => setToUpdateSelected(null)} onUpdated={onRefresh} permission={toUpdateSelected} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={
            <Table items={pageData?.content || []} loading={isLoading} onDeleted={onRefresh} setSelectedToUpdate={setToUpdateSelected} />
          }
          footer={pagination.render()}
          header={<CardHeader name="Permission" onRefresh={onRefresh} total={pageData?.totalElements} />}
        />
      </Container>
    </>
  )
}

Component.displayName = 'SettingPermissionsPage'
