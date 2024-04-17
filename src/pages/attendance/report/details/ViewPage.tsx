import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { useEffect, useState } from 'react'
import { BaseInputDate, Button, CardBody, useToast } from 'jobseeker-ui'
import DetailsTable from '../components/DetailsTable'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import { useParams } from 'react-router-dom'
import { attendanceService, employeeService } from '@/services'
import PageCard from '../components/PageCard'
import usePagination from '@/hooks/use-pagination'
import ProfileCard from '../components/ProfileCard'
import { DateValueType } from 'react-tailwindcss-datepicker'
import { FileSpreadsheetIcon } from 'lucide-react'

const ViewPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [isExporting, setIsExporting] = useState(false)
  const { employeeId } = useParams<{ employeeId: string }>()
  const [pageData, setPageData] = useState<IPaginationResponse<IEmployee>>()
  const [pageDataEmployee, setPageDataEmployee] = useState<IEmployee>()
  const [pageError, setPageError] = useState<any>()
  const todayFormatted = new Date().toISOString().split('T')[0]
  const [filterDate, setFilterDate] = useState<{ startDate: string; endDate: string }>({
    startDate: todayFormatted,
    endDate: todayFormatted,
  })
  const toast = useToast()

  const pagination = usePagination({
    pathname: `/attendance/report/${employeeId}`,
    totalPage: pageData?.totalPages || 0,
  })

  useEffect(() => {
    setIsLoading(true)
    const loadEmployeeData = async () => {
      try {
        if (employeeId) {
          const response = await attendanceService.fetchEmployee(employeeId, {
            attendance_group: 'clock',
            start_date: filterDate?.startDate,
            end_date: filterDate?.endDate,
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
          <>
            <div className="flex flex-col">
              <CardBody className="p-0">
                <div className="chrome-scrollbar flex gap-3 overflow-x-scroll pb-2">
                  {['Attendance', 'Client Visit', 'Overtime'].map((label, index) => (
                    <PageCard key={index} label={label} activeLabel={'Attendance'} />
                  ))}
                </div>
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
          </>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <ProfileCard items={pageDataEmployee} filterDate={filterDate} />
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

export default ViewPage
