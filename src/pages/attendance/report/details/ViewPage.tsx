import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/hooks/use-pagination'
import { attendanceService, employeeService } from '@/services'
import { BaseInputDateRange, Button, CardBody, useToast } from 'jobseeker-ui'
import { FileSpreadsheetIcon } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { DateValueType } from 'react-tailwindcss-datepicker'
import DetailsTable from '../components/DetailsTable'
import ProfileCard from '../components/ProfileCard'
import { twMerge } from 'tailwind-merge'

const ViewPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const { employeeId } = useParams<{ employeeId: string }>()
  const [pageData, setPageData] = useState<IPaginationResponse<IAttendance>>()
  const [pageDataEmployee, setPageDataEmployee] = useState<IEmployee>()
  const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState<{ startDate: string; endDate: string }>({
    startDate: todayFormatted,
    endDate: todayFormatted,
  })
  const toast = useToast()

  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'clock'

  const pagination = usePagination({
    pathname: `/attendance/report/${employeeId}`,
    totalPage: pageData?.totalPages || 0,
    params: { tab: tab, startDate: filterDate?.startDate, endDate: filterDate.endDate },
  })

  useEffect(() => {
    setIsLoading(true)
    const loadEmployeeData = async () => {
      try {
        if (employeeId) {
          const response = await attendanceService.fetchEmployee(employeeId, {
            attendance_group: tab,
            start_date: filterDate?.startDate,
            end_date: filterDate?.endDate,
            page: pagination.currentPage,
          })
          setPageData(response)
        }
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        setPageError(e)
      }
    }

    loadEmployeeData()
  }, [pagination.currentPage, employeeId, filterDate, tab])

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

  const handleExportToExcel = async () => {
    try {
      setIsExporting(true)
      if (employeeId) {
        const excelData = await attendanceService.downloadAttendance(employeeId, {
          start_date: filterDate?.startDate,
          end_date: filterDate?.endDate,
        })

        if (!excelData) {
          console.error('Empty response received.')
          return
        }

        const decodedData = atob(excelData)
        const uint8Array = new Uint8Array(decodedData.length)
        for (let i = 0; i < decodedData.length; i++) {
          uint8Array[i] = decodedData.charCodeAt(i)
        }

        const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'attendance.xlsx'

        document.body.appendChild(a)
        a.click()

        document.body.removeChild(a)
        toast('Download successfully.', { color: 'success' })
        setIsExporting(false)
      }
    } catch (error: any) {
      const errorMessage = error.response?.data?.meta?.message || error.message
      toast(errorMessage, { color: 'error', position: 'top-right' })
      setIsExporting(false)
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
          <div className="flex flex-col">
            <CardBody className="p-0">
              <BaseInputDateRange
                className="z-50 mb-3 w-64"
                placeholder="Start - End Date"
                onValueChange={handleDateChange}
                value={filterDate}
              />
            </CardBody>
            <div className="flex justify-end">
              <Button
                loading={isExporting}
                disabled={isExporting}
                onClick={handleExportToExcel}
                color="success"
                rightChild={<FileSpreadsheetIcon size={18} />}
                className="w-40 gap-2"
              >
                Export To Excel
              </Button>
            </div>
          </div>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <ProfileCard items={pageDataEmployee} filterDate={filterDate}>
          <div className="flex border-b border-gray-200">
            <Link
              to={`/attendance/report/${pageDataEmployee?.oid}`}
              className={twMerge(
                'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                tab === 'clock' && 'border-primary-600',
              )}
            >
              Attendance
            </Link>
            <Link
              to={`/attendance/report/${pageDataEmployee?.oid}?tab=client_visit`}
              className={twMerge(
                'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                tab === 'client_visit' && 'border-primary-600',
              )}
            >
              Client Visit
            </Link>
            <Link
              to={`/attendance/report/${pageDataEmployee?.oid}?tab=overtime`}
              className={twMerge(
                'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                tab === 'overtime' && 'border-primary-600',
              )}
            >
              Overtime
            </Link>
          </div>
        </ProfileCard>

        {tab === 'clock' && (
          <MainCard
            header={() => (
              <MainCardHeader
                title="Report List"
                subtitleLoading={typeof pageData?.totalElements !== 'number'}
                subtitle={
                  <>
                    You have <span className="text-primary-600">{pageData?.totalElements} Report</span> in total
                  </>
                }
              />
            )}
            body={<DetailsTable items={pageData?.content || []} loading={isLoading} />}
            footer={pagination.render()}
          />
        )}
        {tab === 'client_visit' && (
          <MainCard
            header={() => (
              <MainCardHeader
                title="Report List"
                subtitleLoading={typeof pageData?.totalElements !== 'number'}
                subtitle={
                  <>
                    You have <span className="text-primary-600">{pageData?.totalElements} Report</span> in total
                  </>
                }
              />
            )}
            body={<DetailsTable items={pageData?.content || []} loading={isLoading} />}
            footer={pagination.render()}
          />
        )}
        {tab === 'overtime' && (
          <MainCard
            header={() => (
              <MainCardHeader
                title="Report List"
                subtitleLoading={typeof pageData?.totalElements !== 'number'}
                subtitle={
                  <>
                    You have <span className="text-primary-600">{pageData?.totalElements} Report</span> in total
                  </>
                }
              />
            )}
            body={<DetailsTable items={pageData?.content || []} loading={isLoading} />}
            footer={pagination.render()}
          />
        )}
      </Container>
    </>
  )
}

export default ViewPage
