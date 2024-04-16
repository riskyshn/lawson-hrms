import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { useEffect, useState } from 'react'
import { CardBody } from 'jobseeker-ui'
import DetailsTable from '../components/DetailsTable'
import MainCard from '@/components/Elements/Layout/MainCard'
import MainCardHeader from '@/components/Elements/Layout/MainCardHeader'
import { useParams } from 'react-router-dom'
import { attendanceService, employeeService } from '@/services'
import PageCard from '../components/PageCard'
import usePagination from '@/hooks/use-pagination'
import ProfileCard from '../components/ProfileCard'

const ViewPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true)
  const { employeeId } = useParams<{ employeeId: string }>()
  const [pageData, setPageData] = useState<IPaginationResponse<IEmployee>>()
  const [pageDataEmployee, setPageDataEmployee] = useState<IEmployee>()
  const [pageError, setPageError] = useState<any>()

  const pagination = usePagination({
    pathname: `/attendance/report/${employeeId}`,
    totalPage: pageData?.totalPages || 0,
  })

  useEffect(() => {
    setIsLoading(true)
    const loadEmployeeData = async () => {
      try {
        if (employeeId) {
          const response = await attendanceService.fetchEmployee('6611a1732162e5494228534b', {
            attendance_group: 'clock',
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
  }, [employeeId])

  useEffect(() => {
    setIsLoading(true)
    const loadEmployeeData = async () => {
      try {
        if (employeeId) {
          const response = await employeeService.fetchEmployee('6611a1732162e5494228534b')
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
                <PageCard key={index} label={label} activeLabel={'Attendance'} />
              ))}
            </div>
          </CardBody>
        }
      />

      <Container className="relative flex flex-col gap-3 py-3 xl:pb-8">
        <ProfileCard items={pageDataEmployee} />
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
      </Container>
    </>
  )
}

export default ViewPage
