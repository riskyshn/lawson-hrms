import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { DateValueType } from 'react-tailwindcss-datepicker'
import { BaseInputDateRange, Button, CardBody, Select, useToast } from 'jobseeker-ui'
import { FileSpreadsheetIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'
import Container from '@/components/Elements/Layout/Container'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import usePagination from '@/core/hooks/use-pagination'
import { attendanceService, employeeService } from '@/services'
import DetailsTable from '../components/DetailsTable'
import ProfileCard from '../components/ProfileCard'
import Table from './components/Table'

const ViewPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const { employeeId } = useParams<{ employeeId: string }>()
  const [pageData, setPageData] = useState<IPaginationResponse<IEmployeeHistoryAttendance>>()
  const [pageDataAttendance, setPageDataAttendance] = useState<IPaginationResponse<IEmployeeHistoryAttendance>>()
  const [pageDataEmployee, setPageDataEmployee] = useState<IEmployee>()
  const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState<{ endDate: string; startDate: string }>({
    endDate: todayFormatted,
    startDate: todayFormatted,
  })
  const toast = useToast()

  const [searchParams, setSearchParam] = useSearchParams()
  const [isInOffice, setIsInOffice] = useState<string | undefined>(searchParams.get('in_office') || undefined)
  const tab = searchParams.get('tab') || 'clock'

  const pagination = usePagination({
    params: { endDate: filterDate.endDate, startDate: filterDate?.startDate, tab: tab },
    pathname: `/attendance/report/${employeeId}`,
    totalPage: pageData?.totalPages || 0,
  })

  const paginationAttendance = usePagination({
    params: { endDate: filterDate.endDate, startDate: filterDate?.startDate, tab: tab },
    pathname: `/attendance/report/${employeeId}`,
    totalPage: pageDataAttendance?.totalPages || 0,
  })

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    setIsLoading(true)
    const loadEmployeeData = async (signal: AbortSignal) => {
      try {
        if (employeeId) {
          if (tab === 'clock') {
            const response = await attendanceService.fetchAttendanceManagement(
              {
                log_type: '',
                employee_id: employeeId,
                end_date: filterDate?.endDate,
                is_in_office: isInOffice,
                limit: 20,
                page: pagination.currentPage,
                start_date: filterDate?.startDate,
              },
              signal,
            )
            setPageDataAttendance(response)
          } else {
            const response = await attendanceService.fetchAttendanceManagement({
              employee_id: employeeId,
              log_type: tab,
              end_date: filterDate?.endDate,
              page: pagination.currentPage,
              start_date: filterDate?.startDate,
            })
            setPageData(response)
          }
        }
        setIsLoading(false)
      } catch (e) {
        setIsLoading(false)
        setPageError(e)
      }
    }

    loadEmployeeData(signal)
  }, [pagination.currentPage, employeeId, filterDate, tab, isInOffice])

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

      setFilterDate({ endDate: formattedEndDate, startDate: formattedStartDate })
    }
  }

  const handleExportToExcel = async () => {
    try {
      setIsExporting(true)
      if (employeeId) {
        const excelData = await attendanceService.downloadAttendance(employeeId, {
          end_date: filterDate?.endDate,
          start_date: filterDate?.startDate,
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
      toast(errorMessage, { color: 'error' })
      setIsExporting(false)
    }
  }

  const handleInOfficeChange = (value: string) => {
    setIsInOffice(value)
    setSearchParam((prev) => {
      prev.set('in_office', value)
      return prev
    })
  }

  if (pageError) throw pageError

  return (
    <>
      <PageHeader
        actions={
          <div className="w-full">
            <CardBody className="p-0">
              <BaseInputDateRange
                className="z-50 mb-3 w-full md:w-64"
                onValueChange={handleDateChange}
                placeholder="Start - End Date"
                value={filterDate}
              />
            </CardBody>
            <div className="flex justify-end">
              <Button
                className="w-full gap-2 md:w-40"
                color="success"
                disabled={isExporting}
                loading={isExporting}
                onClick={handleExportToExcel}
                rightChild={<FileSpreadsheetIcon size={18} />}
              >
                Export To Excel
              </Button>
            </div>
          </div>
        }
        breadcrumb={[{ text: 'Attendance' }, { text: 'Report' }]}
        subtitle="Manage Your Team Report"
        title="Report"
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <ProfileCard filterDate={filterDate} items={pageDataEmployee}>
          <div className="flex border-b border-gray-200">
            <Link
              className={twMerge(
                'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                tab === 'clock' && 'border-primary-600',
              )}
              to={`/attendance/report/${pageDataEmployee?.oid}`}
            >
              Attendance
            </Link>
            <Link
              className={twMerge(
                'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                tab === 'client_visit' && 'border-primary-600',
              )}
              to={`/attendance/report/${pageDataEmployee?.oid}?tab=client_visit`}
            >
              Client Visit
            </Link>
            <Link
              className={twMerge(
                'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                tab === 'overtime' && 'border-primary-600',
              )}
              to={`/attendance/report/${pageDataEmployee?.oid}?tab=overtime`}
            >
              Overtime
            </Link>
          </div>
        </ProfileCard>

        {tab === 'clock' && (
          <MainCard
            body={<Table items={pageDataAttendance?.content || []} loading={isLoading} />}
            footer={paginationAttendance.render()}
            header={() => (
              <MainCardHeader
                filter={
                  <div className="grid grid-cols-1 gap-3 p-3">
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
                }
                subtitle={
                  <>
                    You have <span className="text-primary-600">{pageDataAttendance?.totalElements} Report</span> in total
                  </>
                }
                subtitleLoading={typeof pageDataAttendance?.totalElements !== 'number'}
                title="Report List"
              />
            )}
          />
        )}
        {tab === 'client_visit' && (
          <MainCard
            body={<DetailsTable items={pageData?.content || []} loading={isLoading} />}
            footer={pagination.render()}
            header={() => (
              <MainCardHeader
                subtitle={
                  <>
                    You have <span className="text-primary-600">{pageData?.totalElements} Report</span> in total
                  </>
                }
                subtitleLoading={typeof pageData?.totalElements !== 'number'}
                title="Report List"
              />
            )}
          />
        )}
        {tab === 'overtime' && (
          <MainCard
            body={<DetailsTable items={pageData?.content || []} loading={isLoading} />}
            footer={pagination.render()}
            header={() => (
              <MainCardHeader
                subtitle={
                  <>
                    You have <span className="text-primary-600">{pageData?.totalElements} Report</span> in total
                  </>
                }
                subtitleLoading={typeof pageData?.totalElements !== 'number'}
                title="Report List"
              />
            )}
          />
        )}
      </Container>
    </>
  )
}

export default ViewPage
