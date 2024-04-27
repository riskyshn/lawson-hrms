import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import usePagination from '@/core/hooks/use-pagination'
import { attendanceService, organizationService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import { AsyncSelect, BaseInputDateRange, CardBody } from 'jobseeker-ui'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DateValueType } from 'react-tailwindcss-datepicker'
import PageCard from '../components/PageCard'
import Table from '../components/Table'
import StatisticCards from '../index/components/StatisticCards'

const ClientVisitPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParam] = useSearchParams()
  const search = searchParams.get('search') || undefined
  const [onChangeData, setOnChangeData] = useState<string>()
  const [pageData, setPageData] = useState<IPaginationResponse<IEmployeeHistoryAttendance>>()
  const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState({
    startDate: searchParams.get('startDate') || todayFormatted,
    endDate: searchParams.get('endDate') || todayFormatted,
  })

  const [branch, setBranch, rawBranch] = useOptionSearchParam('branch')

  const pagination = usePagination({
    pathname: '/attendance/attendance-management/client-visit',
    totalPage: pageData?.totalPages,
    params: { search, branch: rawBranch },
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
            attendance_group: 'client_visit',
            start_date: filterDate?.startDate,
            end_date: filterDate?.endDate,
            branch_id: branch?.value,
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
  }, [search, pagination.currentPage, branch?.value, filterDate, onChangeData])

  const handleDateChange = (selectedDate: DateValueType) => {
    if (selectedDate?.startDate && selectedDate.endDate) {
      const startDate = selectedDate?.startDate ? new Date(selectedDate.startDate) : null
      const endDate = selectedDate?.endDate ? new Date(selectedDate.endDate) : startDate

      const formattedStartDate = startDate && !isNaN(startDate.getTime()) ? startDate.toISOString().split('T')[0] : todayFormatted
      const formattedEndDate = endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split('T')[0] : formattedStartDate

      setFilterDate({ startDate: formattedStartDate, endDate: formattedEndDate })
      setSearchParam((prev) => {
        prev.set('startDate', formattedStartDate)
        prev.set('endDate', formattedEndDate)
        return prev
      })
    }
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        className="flex items-center"
        breadcrumb={[{ text: 'Attendance' }, { text: 'Attendance Management' }]}
        title="Attendance Management"
        subtitle="Manage Your Team Attendance"
        actions={
          <CardBody className="p-0">
            <BaseInputDateRange className="z-50 mb-3" placeholder="Start - End Date" onValueChange={handleDateChange} value={filterDate} />
            <div className="chrome-scrollbar flex gap-3 overflow-x-scroll">
              {['Attendance', 'Client Visit', 'Overtime'].map((label, index) => (
                <PageCard
                  key={index}
                  label={label}
                  activeLabel={'Client Visit'}
                  startDate={filterDate.startDate}
                  endDate={filterDate.endDate}
                />
              ))}
            </div>
          </CardBody>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <StatisticCards filterDate={filterDate} />
        <MainCard
          header={() => (
            <MainCardHeader
              title="Client Visit List"
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
              filter={
                <div className="grid grid-cols-1 gap-3 p-3">
                  <AsyncSelect
                    placeholder="All Branch"
                    withReset
                    action={organizationService.fetchBranches}
                    converter={emmbedToOptions}
                    value={branch}
                    onChange={setBranch}
                  />
                </div>
              }
            />
          )}
          body={<Table items={pageData?.content || []} loading={isLoading} onDataChange={setOnChangeData} isClientVisit />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default ClientVisitPage
