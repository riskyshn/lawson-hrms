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
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import StatisticCards from '../../components/StatisticCards'
import HistoryModal from './components/HistoryModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const [selectedToShowHistoryModal, setSelectedToShowHistoryModal] = useState<IVacancy | null>(null)

  const search = searchParams.get('search')
  const [department, setDepartment, rawDepartment] = useOptionSearchParam('department')
  const [status, setStatus, rawStatus] = useOptionSearchParam('status')

  const { pageData, isLoading, refresh, onRefresh } = useAsyncSearch(
    vacancyService.fetchVacancies,
    { limit: 20, status: status?.value, departmentId: department?.value, isRequisition: 1 },
    search,
  )

  const pagination = usePagination({
    pathname: '/job/requisition',
    totalPage: pageData?.totalPages,
    params: { search, department: rawDepartment, status: rawStatus },
  })

  return (
    <>
      <HistoryModal item={selectedToShowHistoryModal} onClose={() => setSelectedToShowHistoryModal(null)} />

      <PageHeader
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Job Requisition' }]}
        title="Job Requisition"
        subtitle="Manage Your Job Requisition Needs"
        actions={
          <>
            <Button
              as={Link}
              to="/job/requisition/approve-list"
              variant="light"
              color="primary"
              className="text-gray-600"
              leftChild={<SettingsIcon size={16} />}
            >
              Approve List
            </Button>
            <Button as={Link} to="/job/requisition/create" color="primary" className="ml-3">
              Create Requisition
            </Button>
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <StatisticCards isRequisition refresh={refresh} />

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
                setValue: (v) => setSearchParam({ search: v }),
              }}
              filterToogle={toggleOpen}
              onRefresh={onRefresh}
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
                      options={genOptions(['Progress', 'Approved', 'Published', 'Draft', 'Canceled', 'Rejected'])}
                    />
                  </div>
                )
              }
            />
          )}
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              onRefresh={onRefresh}
              setSelectedToShowHistoryModal={setSelectedToShowHistoryModal}
            />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

Component.displayName = 'JobRequisitionPage'
