import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { authorityService } from '@/services'
import { Button } from 'jobseeker-ui'
import { useCallback, useEffect, useState } from 'react'
import CardHeader from '../components/CardHeader'
import CreateModal from './components/CreateModal'
import EditPermissionModal from './components/EditPermissionModal'
import Table from './components/Table'
import EditModal from './components/EditModal'

const SettingRolesPage: React.FC = () => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<IPaginationResponse<IRole>>()
  const [pageError, setPageError] = useState<any>()
  const [toUpdateSelected, setToUpdateSelected] = useState<IRole | null>(null)
  const [toUpdateSelectedPermission, setToUpdateSelectedPermission] = useState<IRole | null>(null)
  const [loadData, setLoadData] = useState(false)

  const pagination = usePagination({
    pathname: '/settings/roles',
    totalPage: pageData?.totalPages || 0,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await authorityService.fetchRoles({ page: pagination.currentPage, limit: 20 }, signal)
        setPageData(data)
        setIsLoading(false)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      }
    }

    load(signal)
    return () => controller.abort()
  }, [loadData, pagination.currentPage])

  const handleUpdate = useCallback(
    (role: IRole) => {
      if (!pageData) return
      setPageData({ ...pageData, content: pageData.content.map((el) => (el.oid === role.oid ? role : el)) })
    },
    [pageData],
  )

  const refreshPageData = useCallback(() => setLoadData((value) => !value), [])

  if (pageError) throw pageError

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
          refreshPageData()
          setToUpdateSelectedPermission(r)
        }}
        onClose={() => setShowCreateModal(false)}
      />
      <EditModal role={toUpdateSelected} onClose={() => setToUpdateSelected(null)} onUpdated={handleUpdate} />
      <EditPermissionModal role={toUpdateSelectedPermission} onClose={() => setToUpdateSelectedPermission(null)} onUpdated={handleUpdate} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={<CardHeader name="Role" total={pageData?.totalElements} />}
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              setSelectedToUpdate={setToUpdateSelected}
              setSelectedToUpdatePermission={setToUpdateSelectedPermission}
              onDeleted={refreshPageData}
            />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default SettingRolesPage
