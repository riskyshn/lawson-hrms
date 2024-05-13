import type { IVacancy } from '@/types'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { AsyncSelect, Button, Select } from 'jobseeker-ui'
import { SettingsIcon } from 'lucide-react'
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
import StatisticCards from '../../components/StatisticCards'
import HistoryModal from './components/HistoryModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const [selectedToShowHistoryModal, setSelectedToShowHistoryModal] = useState<IVacancy | null>(null)

  const search = searchParams.get('search')
  const [department, setDepartment, rawDepartment] = useOptionSearchParam('department')
  const [status, setStatus, rawStatus] = useOptionSearchParam('status')

  const { isLoading, onRefresh, pageData, refresh } = useAsyncSearch(
    vacancyService.fetchVacancies,
    { departmentId: department?.value, isRequisition: 1, limit: 20, status: status?.value },
    search,
  )

  const pagination = usePagination({
    params: { department: rawDepartment, search, status: rawStatus },
    pathname: '/job/requisition',
    totalPage: pageData?.totalPages,
  })

  return (
    <>
      <HistoryModal item={selectedToShowHistoryModal} onClose={() => setSelectedToShowHistoryModal(null)} />

      <PageHeader
        actions={
          <>
            <Button
              as={Link}
              className="text-gray-600"
              color="primary"
              leftChild={<SettingsIcon size={16} />}
              to="/job/requisition/approve-list"
              variant="light"
            >
              Approve List
            </Button>
            <Button as={Link} className="ml-3" color="primary" to="/job/requisition/create">
              Create Requisition
            </Button>
          </>
        }
        breadcrumb={[{ text: 'Job' }, { text: 'Requisition' }, { text: 'Job Requisition' }]}
        subtitle="Manage Your Job Requisition Needs"
        title="Job Requisition"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <StatisticCards light isRequisition refresh={refresh} />

        <MainCard
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              onRefresh={onRefresh}
              setSelectedToShowHistoryModal={setSelectedToShowHistoryModal}
            />
          }
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
                    <Select
                      onChange={setStatus}
                      options={genOptions(['progress', 'approved', 'published', 'draft', 'canceled', 'rejected'])}
                      placeholder="All Status"
                      value={status?.value}
                      withReset
                    />
                  </div>
                )
              }
              filterToogle={toggleOpen}
              onRefresh={onRefresh}
              search={{
                setValue: (v) => setSearchParam({ search: v }),
                value: search || '',
              }}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Vacancy</span> in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Vacancy List"
            />
          )}
        />
      </Container>
    </>
  )
}

Component.displayName = 'JobRequisitionPage'
