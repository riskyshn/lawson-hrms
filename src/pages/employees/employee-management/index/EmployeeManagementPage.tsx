import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { employeeService } from '@/services'
import { useOrganizationStore } from '@/store'
import { Button, Select } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import ResignTerminateModal from './components/ResignTerminateModal'
import Table from './components/Table'

const EmployeeManagementPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const department = searchParams.get('department') || undefined
  const branch = searchParams.get('branch') || undefined

  const { master } = useOrganizationStore()

  const [pageData, setPageData] = useState<IPaginationResponse<IDataTableEmployee>>()
  const [pageError, setPageError] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [selectedToTerminate, setSelectedToTerminate] = useState<IDataTableEmployee | null>(null)
  const [refresh, setRefresh] = useState(false)

  const pagination = usePagination({
    pathname: '/employees/employee-management',
    totalPage: pageData?.totalPages || 0,
    params: { search, department, branch },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await employeeService.fetchEmployees(
          {
            q: search,
            page: pagination.currentPage,
            limit: 20,
            branchId: branch,
            departmentId: department,
          },
          signal,
        )
        setPageData(data)
        setIsLoading(false)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      }
    }

    load(signal)

    return () => {
      controller.abort()
    }
  }, [search, department, branch, pagination.currentPage, refresh])

  if (pageError) throw pageError

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
          setRefresh((v) => !v)
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
                setValue: (v) => setSearchParam({ search: v }),
              }}
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

export default EmployeeManagementPage
