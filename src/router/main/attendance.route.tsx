import ClientVisitPage from '@/pages/attendance/attendance-management/client-visit/ClientVisitPage'
import AttendancePage from '@/pages/attendance/attendance-management/index/AttendancePage'
import OvertimePage from '@/pages/attendance/attendance-management/overtime/OvertimePage'
import ViewPage from '@/pages/attendance/report/details/ViewPage'
import ReportPage from '@/pages/attendance/report/index/ReportPage'
import RequestPage from '@/pages/attendance/request-management/index/RequestPage'
import SchedulePage from '@/pages/attendance/schedule/index/SchedulePage'
import type { RouteObject } from 'react-router-dom'

const attendanceRoute: RouteObject = {
  path: 'attendance',
  name: 'Attendance',
  children: [
    {
      path: 'schedule',
      name: 'Schedule',
      children: [
        {
          path: '',
          element: <SchedulePage />,
        },
      ],
    },
    {
      path: 'attendance-management/attendance',
      name: 'Attendance Management',
      children: [
        {
          path: '',
          element: <AttendancePage />,
        },
      ],
    },
    {
      path: 'attendance-management/client-visit',
      name: 'Attendance Management',
      children: [
        {
          path: '',
          element: <ClientVisitPage />,
        },
      ],
    },
    {
      path: 'attendance-management/overtime',
      name: 'Attendance Management',
      children: [
        {
          path: '',
          element: <OvertimePage />,
        },
      ],
    },
    {
      path: 'request-management',
      name: 'Request Management',
      children: [
        {
          path: '',
          element: <RequestPage />,
        },
      ],
    },
    {
      path: 'report',
      name: 'Report',
      children: [
        {
          path: '',
          element: <ReportPage />,
        },
      ],
    },
    {
      path: 'report/:id',
      name: 'Report Details',
      children: [
        {
          path: '',
          element: <ViewPage />,
        },
      ],
    },
  ],
}

export default attendanceRoute
