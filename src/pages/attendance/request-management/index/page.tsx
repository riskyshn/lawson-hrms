import type { ILeave, IPaginationResponse } from '@/types'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DateValueType } from 'react-tailwindcss-datepicker'
import { BaseInputDateRange, Container, MainCard, MainCardHeader, PageHeader } from 'jobseeker-ui'
import { usePagination } from '@/hooks'
import { attendanceService } from '@/services'
import Table from '../components/Table'

const RequestPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [searchParams, setSearchParam] = useSearchParams()
  const search = searchParams.get('search') || undefined
  const [onChangeData, setOnChangeData] = useState<string>()
  const [pageData, setPageData] = useState<IPaginationResponse<ILeave>>()
  const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState({
    endDate: searchParams.get('endDate') || todayFormatted,
    startDate: searchParams.get('startDate') || todayFormatted,
  })

  const pagination = usePagination({
    params: { search },
    pathname: '/attendance/request-management',
    totalPage: pageData?.totalPages,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const load = async (signal: AbortSignal) => {
      setIsLoading(true)
      try {
        const data = await attendanceService.fetchRequestManagement(
          {
            log_type: '',
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
  }, [search, pagination.currentPage, filterDate, onChangeData])

  const handleDateChange = (selectedDate: DateValueType) => {
    if (selectedDate?.startDate && selectedDate.endDate) {
      const startDate = selectedDate?.startDate ? new Date(selectedDate.startDate) : null
      const endDate = selectedDate?.endDate ? new Date(selectedDate.endDate) : startDate

      const formattedStartDate = startDate && !isNaN(startDate.getTime()) ? startDate.toISOString().split('T')[0] : todayFormatted
      const formattedEndDate = endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split('T')[0] : formattedStartDate

      setFilterDate({ endDate: formattedEndDate, startDate: formattedStartDate })
    }
  }

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Attendance' }, { text: 'Attendance Management' }]}
        subtitle="Manage Your Team Request"
        title="Request Management"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <MainCard
          body={<Table items={pageData?.content || []} loading={isLoading} onDataChange={setOnChangeData} />}
          footer={pagination.render()}
          header={() => (
            <MainCardHeader
              filter={
                <div className="grid grid-cols-1 gap-3 p-3">
                  <BaseInputDateRange
                    displayFormat="DD-MM-YYYY"
                    onValueChange={handleDateChange}
                    placeholder="Start - End Date"
                    value={filterDate}
                  />
                </div>
              }
              search={{
                setValue: (v) => setSearchParam({ search: v }),
                value: search || '',
              }}
              subtitle={
                <>
                  {formatDate(filterDate?.startDate)} - {formatDate(filterDate?.endDate)}
                </>
              }
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              title="Request List"
            />
          )}
        />
      </Container>
    </>
  )
}

export default RequestPage
