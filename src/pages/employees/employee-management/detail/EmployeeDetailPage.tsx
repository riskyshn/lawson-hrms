import Container from '@/components/Elements/Container'
import { Avatar, Button } from 'jobseeker-ui'
import { MailIcon, MapPinnedIcon, User2Icon } from 'lucide-react'
import { useState } from 'react'
import AttendanceTable from './components/AttendanceTable'
import LeaveTable from './components/LeaveTable'
import useEmployeePage from '../hooks/use-employee-page'
import ButtonDeleteEmployee from './components/ButtonDeleteEmployee'
import EmployeDetailCard from './components/EmployeDetailCard'
import { Link } from 'react-router-dom'

interface TabContent {
  id: number
  content: React.ReactNode
}

const EmployeeDetailPage: React.FC<{
  defaultValue?: any
  handlePrev?: () => void
}> = () => {
  const { employee, isLoading } = useEmployeePage()

  const pageDataAttendance = {
    content: [
      {
        date: '18/03/2024',
        type: [
          {
            name: 'Clock In',
            time: '08:40:35',
            status: 'Pending',
            location: {
              lat: -8.7931195,
              lng: 115.1501316,
            },
            attachment: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
          },
          {
            name: 'Clock Out',
            time: '17:30:00',
            status: 'Completed',
            location: {
              lat: -8.7931195,
              lng: 115.1501316,
            },
            attachment: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
          },
        ],
      },
    ],
  }

  const pageDataLeave = {
    content: [
      {
        requestDate: '18/03/2024',
        startDate: '20/03/2024',
        endDate: '21/03/2024',
        requestType: 'Annual Leave',
        department: 'IT',
        branch: 'Kantor Jobseeker Bali',
        attachment: 'https://t3.ftcdn.net/jpg/02/43/12/34/360_F_243123463_zTooub557xEWABDLk0jJklDyLSGl2jrr.jpg',
        notes: 'Cuti Lebaran',
        status: 'Waiting',
      },
    ],
  }

  const [activeTab, setActiveTab] = useState<number>(1)

  const changeTab = (tabNumber: number) => {
    setActiveTab(tabNumber)
  }

  if (isLoading || !employee) return null

  const tabsContent: TabContent[] = [
    {
      id: 1,
      content: <EmployeDetailCard employee={employee} />,
    },
    {
      id: 2,
      content: <AttendanceTable items={pageDataAttendance.content} />,
    },
    {
      id: 3,
      content: <LeaveTable items={pageDataLeave.content} />,
    },
  ]

  return (
    <>
      <Container className="py-8 xl:pb-8">
        <div className="mb-8 flex items-center">
          <Avatar name={employee.name || ''} size={160} className="bg-primary-100 text-2xl text-primary-700" />
          <div className="flex w-full items-center justify-between">
            <div className="mx-6">
              <h3 className="mb-2 text-lg font-semibold">{employee.name}</h3>
              <div className="mb-4 flex gap-4">
                <div className="flex items-center gap-2">
                  <User2Icon className="text-gray-300" size={16} />
                  <p className="text-sm text-gray-500">Developer</p>
                </div>
                <div className="flex gap-2">
                  <MapPinnedIcon className="text-gray-300" size={16} />
                  <p className="text-sm text-gray-500">Badung, Bali</p>
                </div>
                <div className="flex gap-2">
                  <MailIcon className="text-gray-300" size={16} />
                  <p className="text-sm text-gray-500">Developer</p>
                </div>
              </div>
              <div className="flex flex-1 gap-4">
                <Button
                  className="w-full"
                  as={Link}
                  to={`/employees/employee-management/${employee.oid}/edit`}
                  variant="default"
                  color="primary"
                >
                  Edit
                </Button>
                <ButtonDeleteEmployee oid={employee.oid} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex border-b border-gray-200">
            <button
              className={`${
                activeTab === 1 ? 'border-blue-500 text-sm font-semibold text-blue-500' : 'text-sm text-gray-500 hover:text-gray-700'
              } block px-6 py-4 hover:text-blue-500 focus:outline-none`}
              onClick={() => changeTab(1)}
            >
              Employee Information
            </button>
            <button
              className={`${
                activeTab === 2 ? 'border-blue-500 text-sm font-semibold text-blue-500' : 'text-sm text-gray-500 hover:text-gray-700'
              } block px-6 py-4 hover:text-blue-500 focus:outline-none`}
              onClick={() => changeTab(2)}
            >
              Attendance
            </button>
            <button
              className={`${
                activeTab === 3 ? 'border-blue-500 text-sm font-semibold text-blue-500' : 'text-sm text-gray-500 hover:text-gray-700'
              } block px-6 py-4 hover:text-blue-500 focus:outline-none`}
              onClick={() => changeTab(3)}
            >
              Leave Request
            </button>
          </div>
          {tabsContent.map((tab) =>
            tab.id === activeTab ? (
              <div key={tab.id} className="bg-gray-100 py-4">
                <div className="overflow-x-auto">{tab.content}</div>
              </div>
            ) : null,
          )}
        </div>
      </Container>
    </>
  )
}

export default EmployeeDetailPage
