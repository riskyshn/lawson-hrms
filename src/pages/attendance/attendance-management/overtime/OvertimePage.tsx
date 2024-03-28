import Container from '@/components/Elements/Container'
import MainCard from '@/components/Elements/MainCard'
import MainCardHeader from '@/components/Elements/MainCardHeader'
import PageHeader from '@/components/Elements/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { attendanceService } from '@/services'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Table from '../components/Table'
import { BaseInputDate, CardBody, Select } from 'jobseeker-ui'
import { useOrganizationStore } from '@/store'
import StatisticCards from '@/pages/job/components/StatisticCards'
import PageCard from '../components/PageCard'

const OvertimePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParam] = useSearchParams()
  const search = searchParams.get('search') || undefined
  const [onChangeData, setOnChangeData] = useState<string>()
  const [pageData, setPageData] = useState<IPaginationResponse<IAttendance>>()
  const [pageError, setPageError] = useState<any>()

  const branch = searchParams.get('branch') || undefined

  const { master } = useOrganizationStore()

  const pagination = usePagination({
    pathname: '/attendance/attendance-management',
    totalPage: pageData?.totalPages || 0,
    params: { search },
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await attendanceService.fetchAttendanceManagement(
          {
            q: search,
            page: pagination.currentPage,
            limit: 20,
            attendance_group: 'overtime',
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
  }, [search, pagination.currentPage, onChangeData])

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Attendance' }, { text: 'Attendance Management' }]}
        title="Attendance Management"
        subtitle="Manage Your Team Attendance"
        actions={
          <CardBody className="p-0">
            <div className="chrome-scrollbar flex gap-3 overflow-x-scroll p-3 pb-2">
              {['Attendance', 'Client Visit', 'Overtime'].map((label, index) => (
                <PageCard key={index} label={label} activeLabel={'Overtime'} />
              ))}
            </div>
          </CardBody>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <StatisticCards isAttendance />
        <MainCard
          header={(open, toggleOpen) => (
            <MainCardHeader
              title="Overtime List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Attendance</span> in total
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
                      placeholder="All Branch"
                      withReset
                      value={branch}
                      onChange={(e) => {
                        searchParams.set('branch', e.toString())
                        setSearchParam(searchParams)
                      }}
                      options={master.branches.map((el) => ({ label: `${el.name}`, value: el.oid }))}
                    />
                    <BaseInputDate asSingle placeholder="Filter by date" />
                  </div>
                )
              }
            />
          )}
          body={<Table items={pageData?.content || []} loading={isLoading} onDataChange={setOnChangeData} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default OvertimePage
