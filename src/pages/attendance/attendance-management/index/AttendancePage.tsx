import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { DateValueType } from 'react-tailwindcss-datepicker'
import { AsyncSelect, BaseInputDateRange, CardBody, Select } from 'jobseeker-ui'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import useOptionSearchParam from '@/core/hooks/use-option-search-params'
import usePagination from '@/core/hooks/use-pagination'
import { attendanceService, organizationService } from '@/services'
import emmbedToOptions from '@/utils/emmbed-to-options'
import PageCard from '../components/PageCard'
import StatisticCards from './components/StatisticCards'
import Table from './components/Table'

const AttendancePage: React.FC = () => {
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

  const isLate = searchParams.get('is_late') || undefined
  const [isInOffice, setIsInOffice] = useState<string | undefined>(searchParams.get('in_office') || undefined)

  const [branch, setBranch, rawBranch] = useOptionSearchParam('branch')

  const pagination = usePagination({
    params: { branch: rawBranch, search },
    pathname: '/attendance/attendance-management',
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
            log_type: '',
            branch_id: branch?.value,
            end_date: filterDate?.endDate,
            is_in_office: isInOffice,
            is_late: isLate,
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
  }, [search, pagination.currentPage, branch?.value, filterDate, onChangeData, isLate, isInOffice])

  const handleInOfficeChange = (value: string) => {
    setIsInOffice(value)
    setSearchParam((prev) => {
      prev.set('in_office', value)
      return prev
    })
  }

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

  const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        actions={
          <CardBody className="p-0">
            <BaseInputDateRange className="z-20 mb-3" onValueChange={handleDateChange} placeholder="Start - End Date" value={filterDate} />
            <div className="chrome-scrollbar flex gap-3 overflow-x-scroll">
              {['Attendance', 'Client Visit', 'Overtime'].map((label, index) => (
                <PageCard
                  activeLabel={'Attendance'}
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
          header={(open, toggleOpen) => (
            <MainCardHeader
              filter={
                open && (
                  <div className="grid grid-cols-2 gap-3 p-3">
                    <AsyncSelect
                      action={organizationService.fetchBranches}
                      converter={emmbedToOptions}
                      onChange={setBranch}
                      placeholder="All Branch"
                      value={branch}
                      withReset
                    />
                    <Select
                      onChange={(selectedOption: any) => handleInOfficeChange(selectedOption ? selectedOption : '')}
                      options={[
                        { label: 'Yes', value: '1' },
                        { label: 'No', value: '0' },
                      ]}
                      placeholder="In Office"
                      value={isInOffice !== null ? isInOffice : undefined}
                      withReset
                    />
                  </div>
                )
              }
              filterToogle={toggleOpen}
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
              title="Attendance List"
            />
          )}
        />
      </Container>
    </>
  )
}

export default AttendancePage
