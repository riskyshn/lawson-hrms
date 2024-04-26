import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { vacancyService } from '@/services'
import { useOrganizationStore } from '@/store'
import { Button, Select, useAsyncSearch, usePagination } from 'jobseeker-ui'
import { SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import StatisticCards from '../../components/StatisticCards'
import HistoryModal from './components/HistoryModal'
import Table from './components/Table'

export const Component: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const department = searchParams.get('department') || undefined
  const status = searchParams.get('status') || undefined

  const { master } = useOrganizationStore()

  const [selectedToShowHistoryModal, setSelectedToShowHistoryModal] = useState<IVacancy | null>(null)

  const { pageData, isLoading, refresh, onRefresh } = useAsyncSearch(
    vacancyService.fetchVacancies,
    { limit: 20, status, departmentId: department, isRequisition: 1 },
    search,
  )

  const pagination = usePagination({
    pathname: '/job/requisition',
    totalPage: pageData?.totalPages,
    params: { search, department, status },
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
                      placeholder="All Status"
                      withReset
                      value={status}
                      onChange={(e) => {
                        searchParams.set('status', e.toString())
                        setSearchParam(searchParams)
                      }}
                      options={['Progress', 'Approved', 'Published', 'Draft', 'Canceled', 'Rejected'].map((el) => ({
                        label: el,
                        value: el.toLowerCase(),
                      }))}
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
