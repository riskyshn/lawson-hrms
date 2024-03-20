import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { vacancyService } from '@/services'
import { useOrganizationStore } from '@/store'
import { Button, Input, Select } from 'jobseeker-ui'
import { FilterIcon, SearchIcon, SettingsIcon } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import StatisticCards from '../../components/StatisticCards'
import HistoryModal from './components/HistoryModal'
import Table from './components/Table'

const JobRequisitionPage = () => {
  const [searchParams, setSearchParam] = useSearchParams()

  const search = searchParams.get('search') || undefined
  const department = searchParams.get('department') || undefined
  const status = searchParams.get('status') || undefined

  const { master } = useOrganizationStore()

  const [pageData, setPageData] = useState<IPaginationResponse<IVacancy>>()
  const [pageError, setPageError] = useState<any>()
  const [isLoading, setIsLoading] = useState(true)
  const [historyMadalData, setHistoryMadalData] = useState<IVacancy | null>(null)

  const [switchData, setSwitchData] = useState(false)

  const pagination = usePagination({
    pathname: '/job/requisition',
    totalPage: pageData?.totalPages || 0,
    params: { search, department, status },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await vacancyService.fetchVacancies(
          {
            q: search,
            page: pagination.currentPage,
            limit: 20,
            status,
            departmentId: department,
            isRequisition: 1,
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
  }, [search, department, status, pagination.currentPage])

  const updateVacancy = useCallback(
    (vacancy: IVacancy) => {
      if (!pageData) return
      setPageData({ ...pageData, content: pageData.content.map((el) => (el.id === vacancy.id ? vacancy : el)) })
      setSwitchData((v) => !v)
    },
    [pageData],
  )

  const removeVacancy = useCallback(
    (id: string) => {
      if (!pageData) return
      setPageData({ ...pageData, content: pageData.content.filter((el) => el.id !== id) })
      setSwitchData((v) => !v)
    },
    [pageData],
  )

  if (pageError) throw pageError

  return (
    <>
      <HistoryModal vacancy={historyMadalData} onClose={() => setHistoryMadalData(null)} />

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
        <StatisticCards isRequisition switchData={switchData} />

        <MainCard
          header={(open, toggleOpen) => (
            <>
              <div className="flex flex-col gap-3 p-3 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <span className="block text-lg font-semibold">Vacancy List</span>
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="m-0 mt-1 w-full lg:w-64"
                    inputClassName="peer pl-7"
                    rightChild={
                      <SearchIcon
                        className="pointer-events-none absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-primary-600"
                        size={16}
                      />
                    }
                    value={search || ''}
                    onChange={(e) => setSearchParam({ search: e.currentTarget.value })}
                  />
                  <Button iconOnly type="button" color="primary" onClick={toggleOpen}>
                    <FilterIcon size={16} />
                  </Button>
                </div>
              </div>
              {open && (
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
                    options={['Active', 'Inactive', 'Draft', 'Expired', 'Fullfilled'].map((el) => ({
                      label: el,
                      value: el.toLocaleLowerCase(),
                    }))}
                  />
                </div>
              )}
            </>
          )}
          body={
            <Table
              items={pageData?.content || []}
              loading={isLoading}
              onVacancyUpdated={updateVacancy}
              onVacancyDeleted={removeVacancy}
              setHistoryMadalData={setHistoryMadalData}
            />
          }
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default JobRequisitionPage
