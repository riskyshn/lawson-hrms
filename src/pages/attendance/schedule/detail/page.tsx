import { useLocation, useSearchParams } from 'react-router-dom'
import Container from '@jshrms/shared/components/Elements/Layout/Container'
import MainCard from '@jshrms/shared/components/Elements/Layout/MainCard'
import MainCardHeader from '@jshrms/shared/components/Elements/Layout/MainCardHeader'
import PageHeader from '@jshrms/shared/components/Elements/Layout/PageHeader'
import { useAsyncSearch, useOptionSearchParam, usePagination } from '@jshrms/shared/hooks'
import { employeeService, organizationService } from '@jshrms/shared/services'
import { emmbedToOptions } from '@jshrms/shared/utils'
import { AsyncSelect } from '@jshrms/ui'
import Table from './components/Table'

const ScheduleDetailPage: React.FC = () => {
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

export default ScheduleDetailPage
