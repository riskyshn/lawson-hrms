import type { RouteObject } from 'react-router-dom'

import ClientVisitPage from '@/pages/attendance/attendance-management/client-visit/ClientVisitPage'
import AttendancePage from '@/pages/attendance/attendance-management/index/AttendancePage'
import OvertimePage from '@/pages/attendance/attendance-management/overtime/OvertimePage'
import ViewPage from '@/pages/attendance/report/details/ViewPage'
import ReportPage from '@/pages/attendance/report/index/ReportPage'
import RequestPage from '@/pages/attendance/request-management/index/RequestPage'
import SchedulePage from '@/pages/attendance/schedule/index/SchedulePage'

const attendanceRoute: RouteObject = {
  children: [
    {
      children: [
        {
          element: <SchedulePage />,
          path: '',
        },
      ],
      name: 'Schedule',
      path: 'schedule',
    },
    {
      children: [
        {
          element: <AttendancePage />,
          path: '',
        },
      ],
      name: 'Attendance Management',
      path: 'attendance-management/attendance',
    },
    {
      children: [
        {
          element: <ClientVisitPage />,
          path: '',
        },
      ],
      name: 'Attendance Management',
      path: 'attendance-management/client-visit',
    },
    {
      children: [
        {
          element: <OvertimePage />,
          path: '',
        },
      ],
      name: 'Attendance Management',
      path: 'attendance-management/overtime',
    },
    {
      children: [
        {
          element: <RequestPage />,
          path: '',
        },
      ],
      name: 'Request Management',
      path: 'request-management',
    },
    {
      children: [
        {
          element: <ReportPage />,
          path: '',
        },
      ],
      name: 'Report',
      path: 'report',
    },
    {
      children: [
        {
          element: <ViewPage />,
          path: '',
        },
      ],
      name: 'Report Details',
      path: 'report/:employeeId',
    },
  ],
  name: 'Attendance',
  path: 'attendance',
}

export default attendanceRoute
