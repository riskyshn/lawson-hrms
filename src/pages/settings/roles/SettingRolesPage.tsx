import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { authorityService } from '@/services'
import { Button } from 'jobseeker-ui'
import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import CardHeader from '../components/CardHeader'
import CreateModal from './components/CreateModal'
import EditModal from './components/EditModal'
import EditPermissionModal from './components/EditPermissionModal'
import Table from './components/Table'

const SettingRolesPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [toUpdateSelected, setToUpdateSelected] = useState<IRole | null>(null)
  const [toUpdateSelectedPermission, setToUpdateSelectedPermission] = useState<IRole | null>(null)
  const [searchParams] = useSearchParams()

  const search = searchParams.get('search')

  const { pageData, isLoading, onRefresh } = useAsyncSearch(authorityService.fetchRoles, { limit: 20 }, search)

  const pagination = usePagination({
    pathname: '/settings/roles',
    totalPage: pageData?.totalPages,
    params: { search },
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Roles' }]}
        title="Role"
        subtitle="Manage Your Company Role"
        actions={
          <Button onClick={() => setShowCreateModal(true)} color="primary" className="ml-3">
            Add New Role
          </Button>
        }
      />

      <CreateModal
        show={showCreateModal}
        onCreated={(r) => {
          onRefresh()
          setToUpdateSelectedPermission(r)
        }}
        onClose={() => setShowCreateModal(false)}
      />
      <EditModal role={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={onRefresh} />
      <EditPermissionModal role={toUpdateSelectedPermission} onClose={() => setToUpdateSelectedPermission(null)} onUpdated={onRefresh} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={<CardHeader name="Role" total={pageData?.totalElements} onRefresh={onRefresh} />}
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              setSelectedToUpdate={setToUpdateSelected}
              setSelectedToUpdatePermission={setToUpdateSelectedPermission}
              onDeleted={onRefresh}
            />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default SettingRolesPage
