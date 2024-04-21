import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { employeeService } from '@/services'
import { useOrganizationStore } from '@/store'
import { Button, Select } from 'jobseeker-ui'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ResignTerminateModal from './components/ResignTerminateModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')
  const department = searchParams.get('department') || undefined
  const branch = searchParams.get('branch') || undefined

  const { master } = useOrganizationStore()

  const [selectedToTerminate, setSelectedToTerminate] = useState<IDataTableEmployee | null>(null)

  const { pageData, isLoading, onRefresh } = useAsyncSearch(
    employeeService.fetchEmployees,
    { limit: 20, branchId: branch, departmentId: department },
    search,
  )

  const pagination = usePagination({
    pathname: '/employees/employee-management',
    totalPage: pageData?.totalPages,
    params: { search, department, branch },
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Employees' }, { text: 'Employee Management' }]}
        title="Employee Management"
        actions={
          <Button as={Link} to="/employees/employee-management/create" color="primary" className="ml-3">
            Add Employee
          </Button>
        }
      />

      <ResignTerminateModal
        item={selectedToTerminate}
        onSuccess={() => {
          onRefresh()
          setSelectedToTerminate(null)
        }}
        onClose={() => setSelectedToTerminate(null)}
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          header={(open, toggleOpen) => (
            <MainCardHeader
              title="Employee List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Employee</span> in total
                </>
              }
              search={{
                value: search || '',
                setValue: (e) => {
                  searchParams.set('search', e)
                  searchParams.delete('page')
                  setSearchParam(searchParams)
                },
              }}
              onRefresh={onRefresh}
              filterToogle={toggleOpen}
              filter={
                open && (
                  <div className="grid grid-cols-2 gap-3 p-3">
                    <Select
                      placeholder="All Departement"
                      withReset
                      value={department}
                      onChange={(e) => {
                        searchParams.set('department', e.toString())
                        searchParams.delete('page')
                        setSearchParam(searchParams)
                      }}
                      options={master.departments.map((el) => ({ label: `${el.name}`, value: el.oid }))}
                    />
                    <Select
                      placeholder="All Branch"
                      withReset
                      value={branch}
                      onChange={(e) => {
                        searchParams.set('branch', e.toString())
                        searchParams.delete('page')
                        setSearchParam(searchParams)
                      }}
                      options={master.branches.map((el) => ({ label: `${el.name}`, value: el.oid }))}
                    />
                  </div>
                )
              }
            />
          )}
          body={<Table items={pageData?.content || []} loading={isLoading} setSelectedTerminate={setSelectedToTerminate} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

Component.displayName = 'EmployeeManagementPage'
