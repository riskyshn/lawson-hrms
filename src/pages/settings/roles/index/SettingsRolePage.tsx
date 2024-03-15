import Container from '@/components/Elements/Container'
import ErrorScreen from '@/components/Elements/ErrorScreen'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { authorityService } from '@/services'
import { PaginationResponse } from '@/types/pagination'
import { Button } from 'jobseeker-ui'
import { useCallback, useEffect, useState } from 'react'
import CreateOrUpdateModal from './components/CreateOrUpdateModal'
import Table from './components/Table'

const SettingsRolePage: React.FC = () => {
  const [showCreateRoleModal, setShowCreateRoleModal] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<PaginationResponse<IRole>>()
  const [toUpdateSelected, setToUpdateSelected] = useState<IRole | null>(null)
  const [loadData, setLoadData] = useState(false)

  const pagination = usePagination({
    pathname: '/settings/role',
    totalPage: pageData?.totalPages || 0,
    params: {},
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setErrorMessage('')
      setIsLoading(true)
      try {
        const data = await authorityService.fetchRoles({ page: pagination.currentPage, size: 20 }, signal)
        setPageData(data)
      } catch (e: any) {
        if (e.message !== 'canceled') {
          setErrorMessage(e.response?.data?.meta?.message || e.message)
        }
      }
      setIsLoading(false)
    }

    load(signal)

    return () => {
      controller.abort()
    }
  }, [loadData, pagination.currentPage])

  const handleUpdate = useCallback(
    (role: IRole) => {
      if (!pageData) return
      setPageData({ ...pageData, content: pageData.content.map((el) => (el.oid === role.oid ? role : el)) })
    },
    [pageData],
  )

  const refreshPageData = useCallback(() => {
    setLoadData((value) => !value)
  }, [])

  if (errorMessage) return <ErrorScreen code={500} message={errorMessage} />

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Settings' }, { text: 'Role' }]}
        title="Role"
        subtitle="Manage Your Role"
        actions={
          <Button onClick={() => setShowCreateRoleModal(true)} color="primary" className="ml-3">
            Add New Role
          </Button>
        }
      />

      <CreateOrUpdateModal
        show={showCreateRoleModal || !!toUpdateSelected}
        role={toUpdateSelected || undefined}
        onCreated={refreshPageData}
        onUpdated={handleUpdate}
        onClose={() => {
          if (toUpdateSelected) setToUpdateSelected(null)
          else setShowCreateRoleModal(false)
        }}
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={
            <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <span className="block text-lg font-semibold">Role List</span>
                <span className="block text-sm">
                  You have <span className="text-primary-600">{pageData?.totalElements || 0} Role</span> in this list
                </span>
              </div>
            </div>
          }
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              setSelectedToUpdate={setToUpdateSelected}
              setSelectedToUpdatePermission={setToUpdateSelected}
              onDeleted={refreshPageData}
            />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default SettingsRolePage
