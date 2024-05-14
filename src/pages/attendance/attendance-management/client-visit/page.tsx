import type { IEmployeeHistoryAttendance, IPaginationResponse } from '@jshrms/shared/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DateValueType } from 'react-tailwindcss-datepicker'
import Container from '@jshrms/shared/components/Elements/Layout/Container'
import MainCard from '@jshrms/shared/components/Elements/Layout/MainCard'
import MainCardHeader from '@jshrms/shared/components/Elements/Layout/MainCardHeader'
import PageHeader from '@jshrms/shared/components/Elements/Layout/PageHeader'
import { useOptionSearchParam, usePagination } from '@jshrms/shared/hooks'
import { attendanceService, organizationService } from '@jshrms/shared/services'
import { emmbedToOptions } from '@jshrms/shared/utils'
import { AsyncSelect, BaseInputDateRange, CardBody } from '@jshrms/ui'
import PageCard from '../components/PageCard'
import Table from '../components/Table'
import StatisticCards from '../index/components/StatisticCards'

export const Component: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParam] = useSearchParams()
  const search = searchParams.get('search') || undefined
  const [onChangeData, setOnChangeData] = useState<string>()
  const [pageData, setPageData] = useState<IPaginationResponse<IEmployeeHistoryAttendance>>()
  const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState({
    endDate: searchParams.get('endDate') || todayFormatted,
    startDate: searchParams.get('startDate') || todayFormatted,
  })

  const [branch, setBranch, rawBranch] = useOptionSearchParam('branch')

  const pagination = usePagination({
    params: { branch: rawBranch, search },
    pathname: '/attendance/attendance-management/client-visit',
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
            log_type: 'client_visit',
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
                  activeLabel={'Client Visit'}
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
          body={<Table isClientVisit items={pageData?.content || []} loading={isLoading} onDataChange={setOnChangeData} />}
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
              title="Client Visit List"
            />
          )}
        />
      </Container>
    </>
  )
}

Component.displayName = 'ClientVisitPage'
