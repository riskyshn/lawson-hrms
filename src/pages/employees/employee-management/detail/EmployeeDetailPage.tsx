import Container from '@/components/Elements/Layout/Container'
import PageHeader from '@/components/Elements/Layout/PageHeader'
import { Link, useSearchParams } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'
import useEmployeePage from '../hooks/use-employee-page'
import AttendanceTable from './components/AttendanceTable'
import EmployeDetailCard from './components/EmployeDetailCard'
import LeaveTable from './components/LeaveTable'
import ProfileCard from './components/ProfileCard'
import { Spinner } from 'jobseeker-ui'

const EmployeeDetailPage: React.FC = () => {
  const { employee, isLoading } = useEmployeePage()

  const [searchParams] = useSearchParams()
  const tab = searchParams.get('tab') || 'employee-information'

  const breadcrumb = [{ text: 'Employees' }, { text: 'Employee Management' }]
  if (employee?.name) breadcrumb.push({ text: employee.name })

  return (
    <>
      <PageHeader breadcrumb={breadcrumb} />

      <Container className="grid grid-cols-1 gap-3 py-3 xl:pb-8">
        {isLoading && (
          <div className="flex items-center justify-center py-48">
            <Spinner height={40} className="text-primary-600" />
          </div>
        )}

        {!isLoading && employee && (
          <>
            <ProfileCard employee={employee}>
              <div className="flex border-b border-gray-200">
                <Link
                  to={`/employees/employee-management/${employee.oid}`}
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'employee-information' && 'border-primary-600',
                  )}
                >
                  Employee Information
                </Link>
                <Link
                  to={`/employees/employee-management/${employee.oid}?tab=attendance`}
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'attendance' && 'border-primary-600',
                  )}
                >
                  Attendance
                </Link>
                <Link
                  to={`/employees/employee-management/${employee.oid}?tab=leave-request`}
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'leave-request' && 'border-primary-600',
                  )}
                >
                  Leave Request
                </Link>
              </div>
            </ProfileCard>

            {tab === 'employee-information' && <EmployeDetailCard employee={employee} />}
            {tab === 'attendance' && <AttendanceTable employee={employee} />}
            {tab === 'leave-request' && <LeaveTable employee={employee} />}
          </>
        )}
      </Container>
    </>
  )
}

export default EmployeeDetailPage
