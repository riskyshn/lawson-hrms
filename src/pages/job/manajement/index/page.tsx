import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useAsyncSearch from '@/core/hooks/use-async-search'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import usePagination from '@/core/hooks/use-pagination'
import { organizationService, vacancyService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import genOptions from '@/utils/gen-options'
import { AsyncSelect, Button, Select } from 'jobseeker-ui'
import { SettingsIcon } from 'lucide-react'
import { Link, useSearchParams } from 'react-router-dom'
import StatisticCards from '../../components/StatisticCards'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search')
  const [department, setDepartment, rawDepartment] = useOptionSearchParam('department')
  const [status, setStatus, rawStatus] = useOptionSearchParam('status')

  const { pageData, isLoading, refresh, onRefresh } = useAsyncSearch(
    vacancyService.fetchVacancies,
    { limit: 20, status: status?.value, departmentId: department?.value, isRequisition: 0 },
    search,
  )

  const pagination = usePagination({
    pathname: '/job/management',
    totalPage: pageData?.totalPages,
    params: { search, department: rawDepartment, status: rawStatus },
  })

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Management' }, { text: 'Job Management' }]}
        title="Job Management"
        subtitle="Manage Your Job Vacancy"
        actions={
          <>
            <Button
              as={Link}
              to="/job/management/recruitment-stages"
              variant="light"
              color="primary"
              className="text-gray-600"
              leftChild={<SettingsIcon size={16} />}
            >
              Recruitment Stages
            </Button>
            <Button as={Link} to="/job/management/create" color="primary" className="ml-3">
              Create Job Posting
            </Button>
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <StatisticCards refresh={refresh} />

        <MainCard
          header={(open, toggleOpen) => (
            <MainCardHeader
              title="Vacancy List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Vacancy</span> in total
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
                    <AsyncSelect
                      placeholder="All Departement"
                      withReset
                      action={organizationService.fetchDepartments}
                      converter={emmbedToOptions}
                      value={department}
                      onChange={setDepartment}
                    />
                    <Select
                      placeholder="All Status"
                      withReset
                      value={status?.value}
                      onChange={setStatus}
                      options={genOptions(['active', 'inactive', 'draft', 'expired', 'fulfilled'])}
                    />
                  </div>
                )
              }
            />
          )}
          body={<Table items={pageData?.content || []} loading={isLoading} onRefresh={onRefresh} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

Component.displayName = 'JobManajementPage'
