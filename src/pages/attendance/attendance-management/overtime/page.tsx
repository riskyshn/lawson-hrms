import type { IEmployeeHistoryAttendance, IPaginationResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DateValueType } from 'react-tailwindcss-datepicker'
import { AsyncSelect, BaseInputDateRange, CardBody, Container, MainCard, MainCardHeader, PageHeader } from 'jobseeker-ui'
import { useOptionSearchParam, usePagination } from '@/hooks'
import { attendanceService, organizationService } from '@/services'
import { emmbedToOptions } from '@/utils'
import PageCard from '../components/PageCard'
import Table from '../components/Table'
import StatisticCards from '../index/components/StatisticCards'

const OvertimePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParam] = useSearchParams()
  const [onChangeData, setOnChangeData] = useState<string>()
  const [pageData, setPageData] = useState<IPaginationResponse<IEmployeeHistoryAttendance>>()
  const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState({
    endDate: searchParams.get('endDate') || todayFormatted,
    startDate: searchParams.get('startDate') || todayFormatted,
  })

  const search = searchParams.get('search') || undefined
  const [branch, setBranch, rawBranch] = useOptionSearchParam('branch')

  const pagination = usePagination({
    params: { branch: rawBranch, search },
    pathname: '/attendance/attendance-management/overtime',
    totalPage: pageData?.totalPages,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await attendanceService.fetchAttendanceManagement(
          {
            log_type: 'overtime',
            branch_id: branch?.value,
            end_date: filterDate?.endDate,
            limit: 20,
            page: pagination.currentPage,
            q: search,
            start_date: filterDate?.startDate,
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

      setFilterDate({ endDate: formattedEndDate, startDate: formattedStartDate })
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
        actions={
          <CardBody className="p-0">
            <BaseInputDateRange
              className="z-20 mb-3"
              displayFormat="DD-MM-YYYY"
              onValueChange={handleDateChange}
              placeholder="Start - End Date"
              value={filterDate}
            />
            <div className="chrome-scrollbar flex gap-3 overflow-x-scroll">
              {['Attendance', 'Client Visit', 'Overtime'].map((label, index) => (
                <PageCard
                  activeLabel={'Overtime'}
                  endDate={filterDate.endDate}
                  key={index}
                  label={label}
                  startDate={filterDate.startDate}
                />
              ))}
            </div>
          </CardBody>
        }
        breadcrumb={[{ text: 'Attendance' }, { text: 'Attendance Management' }]}
        className="flex items-center"
        subtitle="Manage Your Team Attendance"
        title="Attendance Management"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <StatisticCards filterDate={filterDate} onChangeData={onChangeData} />
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onDataChange={setOnChangeData} />}
          footer={pagination.render()}
          header={() => (
            <MainCardHeader
              filter={
                <div className="grid grid-cols-1 gap-3 p-3">
                  <AsyncSelect
                    action={organizationService.fetchBranches}
                    converter={emmbedToOptions}
                    onChange={setBranch}
                    placeholder="All Branch"
                    value={branch}
                    withReset
                  />
                </div>
              }
              search={{
                setValue: (v) => setSearchParam({ search: v }),
                value: search || '',
              }}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Attendance</span> in total
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Overtime List"
            />
          )}
        />
      </Container>
    </>
  )
}

export default OvertimePage
