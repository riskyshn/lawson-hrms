import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { attendanceService, employeeService } from '@/services'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { BaseInputDate, CardBody } from 'jobseeker-ui'
import PageCard from '../components/PageCard'
import DetailsTable from '../components/DetailsTable'
import ProfileCard from '../components/ProfileCard'
import { DateValueType } from 'react-tailwindcss-datepicker'

const OvertimePage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [pageData, setPageData] = useState<IPaginationResponse<IEmployee>>()
  const [pageError, setPageError] = useState<any>()
  const { employeeId } = useParams<{ employeeId: string }>()
  const [pageDataEmployee, setPageDataEmployee] = useState<IEmployee>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState<{ startDate: string; endDate: string }>({
    startDate: todayFormatted,
    endDate: todayFormatted,
  })

  const pagination = usePagination({
    pathname: `/attendance/report/${employeeId}/overtime`,
    totalPage: pageData?.totalPages || 0,
  })

  useEffect(() => {
    const controller = new AbortController()

    const payload = {
      attendance_group: 'overtime',
      start_date: filterDate?.startDate,
      end_date: filterDate?.endDate,
    }

    const load = async () => {
      setIsLoading(true)
      try {
        if (employeeId) {
          const response = await attendanceService.fetchEmployee(employeeId, payload)
          setPageData(response)
        }

        setIsLoading(false)
      } catch (e: any) {
        if (e.message !== 'canceled') setPageError(e)
      }
    }

    load()

    return () => {
      controller.abort()
    }
  }, [pagination.currentPage, employeeId, filterDate])

  useEffect(() => {
    setIsLoading(true)
    const loadEmployeeData = async () => {
      try {
        if (employeeId) {
          const response = await employeeService.fetchEmployee(employeeId)
          setPageDataEmployee(response)
        }
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        setPageError(e)
      }
    }

    loadEmployeeData()
  }, [employeeId])

  const handleDateChange = (selectedDate: DateValueType) => {
    if (selectedDate?.startDate && selectedDate.endDate) {
      const startDate = selectedDate?.startDate ? new Date(selectedDate.startDate) : null
      const endDate = selectedDate?.endDate ? new Date(selectedDate.endDate) : startDate

      const formattedStartDate = startDate && !isNaN(startDate.getTime()) ? startDate.toISOString().split('T')[0] : todayFormatted
      const formattedEndDate = endDate && !isNaN(endDate.getTime()) ? endDate.toISOString().split('T')[0] : formattedStartDate

      setFilterDate({ startDate: formattedStartDate, endDate: formattedEndDate })
    }
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        breadcrumb={[{ text: 'Attendance' }, { text: 'Report' }]}
        title="Report"
        subtitle="Manage Your Team Report"
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
        <ProfileCard items={pageDataEmployee} />
        <MainCard
          header={(open, toggleOpen) => (
            <MainCardHeader
              title="Report List"
              subtitleLoading={typeof pageData?.totalElements !== 'number'}
              subtitle={
                <>
                  You have <span className="text-primary-600">{pageData?.totalElements} Report</span> in total
                </>
              }
              filterToogle={toggleOpen}
              filter={
                open && (
                  <div className="grid grid-cols-1 gap-3 p-3">
                    <BaseInputDate placeholder="Start - End Date" onValueChange={handleDateChange} value={filterDate} />
                  </div>
                )
              }
            />
          )}
          body={<DetailsTable items={pageData?.content || []} loading={isLoading} />}
          footer={pagination.render()}
        />
      </Container>
    </>
  )
}

export default OvertimePage
