import { Link, useSearchParams } from 'react-router-dom'
import { Container, PageHeader, Spinner } from 'jobseeker-ui'
import { twMerge } from 'tailwind-merge'
import useEmployeePage from '../hooks/use-employee-page'
import AttendanceTable from './components/AttendanceTable'
import EmployeDetailCard from './components/EmployeDetailCard'
import LeaveTable from './components/LeaveTable'
import PayrollDetailCard from './components/PayrollDetailCard'
import ProfileCard from './components/ProfileCard'

export const Component: React.FC = () => {
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
            <Spinner className="text-primary-600" height={40} />
          </div>
        )}

        {!isLoading && employee && (
          <>
            <ProfileCard employee={employee}>
              <div className="flex border-b border-gray-200">
                <Link
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'employee-information' && 'border-primary-600',
                  )}
                  to={`/employees/employee-management/${employee.oid}`}
                >
                  Employee Information
                </Link>
                <Link
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'attendance' && 'border-primary-600',
                  )}
                  to={`/employees/employee-management/${employee.oid}?tab=attendance`}
                >
                  Attendance
                </Link>
                <Link
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'leave-request' && 'border-primary-600',
                  )}
                  to={`/employees/employee-management/${employee.oid}?tab=leave-request`}
                >
                  Leave Request
                </Link>
                <Link
                  className={twMerge(
                    'block border-t-4 border-transparent px-6 py-4 text-sm font-semibold hover:text-primary-600',
                    tab === 'payroll' && 'border-primary-600',
                  )}
                  to={`/employees/employee-management/${employee.oid}?tab=payroll`}
                >
                  Payroll
                </Link>
              </div>
            </ProfileCard>

            {tab === 'employee-information' && <EmployeDetailCard employee={employee} />}
            {tab === 'attendance' && <AttendanceTable employee={employee} />}
            {tab === 'leave-request' && <LeaveTable employee={employee} />}
            {tab === 'payroll' && <PayrollDetailCard employee={employee} />}
          </>
        )}
      </Container>
    </>
  )
}

Component.displayName = 'EmployeeDetailPage'
