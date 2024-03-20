import Container from '@/components/Elements/Container'
import { Avatar, Button, Card, CardBody, CardHeader } from 'jobseeker-ui'
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
        <>
          <Card className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Personal Data</h3>
              <p className="text-xs text-gray-500">Employee personal basic information data</p>
            </CardHeader>
            <CardBody className="p-0">
              <table className="table w-full text-sm">
                <tbody>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Name</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Gender</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Religion</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Email</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Phone Number</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Place of Birth</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Date of Birth</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Marital Status</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Number of Children</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Identity & Address</h3>
              <p className="text-xs text-gray-500">Employee identity address information</p>
            </CardHeader>
            <CardBody className="p-0">
              <table className="table w-full text-sm">
                <tbody>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">National ID</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">National ID Number</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Postal Code</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Nation ID Address</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Residential Address</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Employment Data</h3>
              <p className="text-xs text-gray-500">Employee data information related to company</p>
            </CardHeader>
            <CardBody className="p-0">
              <table className="table w-full text-sm">
                <tbody>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Employee ID</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Role</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Employment Status</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Branch Placement</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Department</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Position</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Job Level</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr>
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">PIC for Approval</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Schedule</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Payroll Information</h3>
              <p className="text-xs text-gray-500">Payroll Information Details</p>
            </CardHeader>
            <CardBody className="p-0">
              <table className="table w-full text-sm">
                <tbody>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Tax Method</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Base Salary</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Allow for Overtime</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Bank Information</h3>
              <p className="text-xs text-gray-500">Employee bank information details</p>
            </CardHeader>
            <CardBody className="p-0">
              <table className="table w-full text-sm">
                <tbody>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Bank Name</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Account Number</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Account Holder Name</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">Tax Information</h3>
              <p className="text-xs text-gray-500">The tax calculation type relevant to your company</p>
            </CardHeader>
            <CardBody className="p-0">
              <table className="table w-full text-sm">
                <tbody>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Employment Tax Status</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">NPWP Number</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">PTKP Status</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Category</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <h3 className="text-lg font-semibold">BPJS Information</h3>
              <p className="text-xs text-gray-500">Employee BPJS payment arrangements</p>
            </CardHeader>
            <CardBody className="p-0">
              <table className="table w-full text-sm">
                <tbody>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Paid by Company</th>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Hari Tua (JHT)</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kecelakaan Kerja (JKK)</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kematian (JKM)</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Pensiun (JP)</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kesehatan (KS)</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Paid by Employee</th>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Hari Tua (JHT)</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Pensiun (JP)</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                  <tr className="odd:bg-gray-50">
                    <th className="whitespace-nowrap border-y px-3 py-2 text-left">Jaminan Kesehatan (KS)</th>
                    <td className="border-y px-3 py-2">:</td>
                    <td className="w-full border-y px-3 py-2">Test</td>
                  </tr>
                </tbody>
              </table>
            </CardBody>
          </Card>
        </>
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
