import Container from '@/components/Elements/Container'
import { Avatar, Button, Card, CardBody } from 'jobseeker-ui'
import { useState } from 'react'
import { MailIcon, MapPinnedIcon, User2Icon } from 'lucide-react'
import AttendanceTable from '../components/AttendanceTable'
import LeaveTable from '../components/LeaveTable'

interface TabContent {
  id: number
  content: React.ReactNode
}

const EmployeeDetailPage: React.FC<{
  defaultValue?: any
  handlePrev?: () => void
}> = () => {
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

  const tabsContent: TabContent[] = [
    {
      id: 1,
      content: (
        <Card as="form" onSubmit={() => {}}>
          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Personal Data</h3>
              <p className="text-xs text-gray-500">Employee personal basic information data</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Name</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Gender</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Religion</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Email</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Phone Number</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Place of Birth</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Date of Birth</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Marital Status</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Number of Children</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Identity & Address</h3>
              <p className="text-xs text-gray-500">Employee identity address information</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">National ID</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">National ID Number</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Postal Code</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Nation ID Address</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Residential Address</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Employment Data</h3>
              <p className="text-xs text-gray-500">Employee data information related to company</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Employee ID</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Role</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Employment Status</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Branch Placement</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Department</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Position</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Job Level</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">PIC for Approval</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Schedule</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Payroll Information</h3>
              <p className="text-xs text-gray-500">Payroll Information Details</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Tax Method</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Base Salary</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Allow for Overtime</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Bank Information</h3>
              <p className="text-xs text-gray-500">Employee bank information details</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Bank Name</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Account Number</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Account Holder Name</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">Tax Configuration</h3>
              <p className="text-xs text-gray-500">The tax calculation type relevant to your company</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Employment Tax Status</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">NPWP Number</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">PTKP Status</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Category</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
          </CardBody>

          <CardBody className="grid grid-cols-1 gap-2">
            <div className="pb-2">
              <h3 className="text-lg font-semibold">BPJS Configuration</h3>
              <p className="text-xs text-gray-500">Employee BPJS payment arrangements</p>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold">Paid by Company</p>
            </div>
            <div className="mb-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="block text-sm font-semibold">Jaminan Hari Tua (JHT)</label>
                  <label className="block text-sm">Test</label>
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-semibold">Jaminan Kecelakaan Kerja (JKK)</label>
                  <label className="block text-sm">Test</label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="block text-sm font-semibold">Jaminan Kematian (JKM)</label>
                  <label className="block text-sm">Test</label>
                </div>
                <div className="flex flex-col">
                  <label className="block text-sm font-semibold">Jaminan Pensiun (JP)</label>
                  <label className="block text-sm">Test</label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="block text-sm font-semibold">Jaminan Kesehatan (KS)</label>
                  <label className="block text-sm">Test</label>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold">Paid by Employee</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Jaminan Hari Tua (JHT)</label>
                <label className="block text-sm">Test</label>
              </div>
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Jaminan Pensiun (JP)</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col">
                <label className="block text-sm font-semibold">Jaminan Kesehatan (KS)</label>
                <label className="block text-sm">Test</label>
              </div>
            </div>
          </CardBody>
        </Card>
      ),
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
          <Avatar name="John Doe" size={160} className="bg-primary-100 text-2xl text-primary-700" />
          <div className="flex w-full items-center justify-between">
            <div className="mx-6">
              <h3 className="mb-2 text-lg font-semibold">John Doe</h3>
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
              <div className="flex gap-4">
                <a
                  href="/new"
                  className="group flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 py-3 text-sm font-medium leading-6 text-slate-900 hover:border-solid hover:border-blue-500 hover:bg-white hover:text-blue-500"
                >
                  Attendance
                </a>
                <a
                  href="/new"
                  className="group flex w-full flex-col items-center justify-center rounded-md border-2 border-dashed border-slate-300 py-3 text-sm font-medium leading-6 text-slate-900 hover:border-solid hover:border-blue-500 hover:bg-white hover:text-blue-500"
                >
                  Leave Quota
                </a>
              </div>
            </div>
            <div className="flex gap-4">
              <Button variant="default" color="primary">
                Edit
              </Button>
              <Button variant="light" color="error">
                Delete
              </Button>
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
