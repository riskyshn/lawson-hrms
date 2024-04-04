import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import PageHeader from '@/components/Elements/PageHeader'
import useAsyncSearch from '@/hooks/use-async-search'
import usePagination from '@/hooks/use-pagination'
import { vacancyService } from '@/services'
import { useOrganizationStore } from '@/store'
import { Button, Select } from 'jobseeker-ui'
import { SettingsIcon } from 'lucide-react'
import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import StatisticCards from '../../components/StatisticCards'
import HistoryModal from './components/HistoryModal'
import Table from './components/Table'

const JobRequisitionPage: React.FC = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const department = searchParams.get('department') || undefined
  const page = searchParams.get('page') || undefined
  const status = searchParams.get('status') || undefined

  const { master } = useOrganizationStore()

  const [selectedToShowHistoryModal, setSelectedToShowHistoryModal] = useState<IVacancy | null>(null)
  const [refresh, setRefresh] = useState(false)

  const { pageData, isLoading } = useAsyncSearch<IVacancy>({
    action: vacancyService.fetchVacancies,
    params: { limit: 20, status, departmentId: department, isRequisition: 1, page },
    input: search || '',
    refresh,
  })

  const pagination = usePagination({
    pathname: '/job/requisition',
    totalPage: pageData?.totalPages || 0,
    params: { search, department, status },
  })

  const onRefresh = () => setRefresh((v) => !v)
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
                      options={['Approvall', 'Approved', 'Published', 'Draft', 'Canceled'].map((el) => ({
                        label: el,
                        value: el.toLocaleLowerCase(),
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

export default JobRequisitionPage
