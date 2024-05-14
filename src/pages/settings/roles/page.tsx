import type { IRole } from '@jshrms/shared/types'
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
import EditPermissionModal from './components/EditPermissionModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toUpdateSelected, setToUpdateSelected] = useState<IRole | null>(null)
  const [toUpdateSelectedPermission, setToUpdateSelectedPermission] = useState<IRole | null>(null)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')

  const { isLoading, onRefresh, pageData } = useAsyncSearch(authorityService.fetchRoles, { limit: 20 }, search)

  const pagination = usePagination({
    params: { search },
    pathname: '/settings/roles',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader
        actions={
          <Button className="ml-3" color="primary" onClick={() => setShowCreateModal(true)}>
            Add New Role
          </Button>
        }
        breadcrumb={[{ text: 'Settings' }, { text: 'Roles' }]}
        subtitle="Manage Your Company Role"
        title="Role"
      />

      <CreateModal
        onClose={() => setShowCreateModal(false)}
        onCreated={(r) => {
          onRefresh()
          setToUpdateSelectedPermission(r)
        }}
        show={showCreateModal}
      />
      <EditModal onClose={() => setToUpdateSelected(null)} onUpdated={onRefresh} role={toUpdateSelected} />
      <EditPermissionModal onClose={() => setToUpdateSelectedPermission(null)} onUpdated={onRefresh} role={toUpdateSelectedPermission} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              onDeleted={onRefresh}
              setSelectedToUpdate={setToUpdateSelected}
              setSelectedToUpdatePermission={setToUpdateSelectedPermission}
            />
          }
          footer={pagination.render()}
          header={<CardHeader name="Role" onRefresh={onRefresh} total={pageData?.totalElements} />}
        />
      </Container>
    </>
  )
}

Component.displayName = 'SettingRolesPage'
