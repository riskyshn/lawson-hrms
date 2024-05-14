import { useLocation, useSearchParams } from 'react-router-dom'
import { AsyncSelect } from '@jshrms/ui'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import usePagination from '@/core/hooks/use-pagination'
import { employeeService, organizationService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')
  const [department, setDepartment, rawDepartment] = useOptionSearchParam('department')
  const [branch, setBranch, rawBranch] = useOptionSearchParam('branch')
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const scheduleId = params.get('scheduleId') || ''
  const scheduleName = params.get('scheduleName') || ''

  const { isLoading, onRefresh, pageData } = useAsyncSearch(
    employeeService.fetchEmployees,
    { scheduleId: scheduleId, branchId: branch?.value, departmentId: department?.value, limit: 20 },
    search,
  )

  const pagination = usePagination({
    params: { branch: rawBranch, department: rawDepartment, schedule: scheduleId, search },
    pathname: '/attendance/schedule/detail',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <PageHeader breadcrumb={[{ text: 'Schedule' }, { text: 'Detail' }]} title={`Employee on ${scheduleName}`} />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} />}
          footer={pagination.render()}
          header={(open, toggleOpen) => (
            <MainCardHeader
              filter={
                open && (
                  <div className="grid grid-cols-2 gap-3 p-3">
                    <AsyncSelect
                      action={organizationService.fetchDepartments}
                      converter={emmbedToOptions}
                      onChange={setDepartment}
                      placeholder="All Departement"
                      value={department}
                      withReset
                    />

                    <AsyncSelect
                      action={organizationService.fetchBranches}
                      converter={emmbedToOptions}
                      onChange={setBranch}
                      placeholder="All Branch"
                      value={branch}
                      withReset
                    />
                  </div>
                )
              }
              filterToogle={toggleOpen}
              onRefresh={onRefresh}
              search={{
                setValue: (e) => {
                  searchParams.set('search', e)
                  searchParams.delete('page')
                  setSearchParam(searchParams)
                },
                value: search || '',
              }}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Employee</span> in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Employee List"
            />
          )}
        />
      </Container>
    </>
  )
}

Component.displayName = 'ScheduleDetailPage'
