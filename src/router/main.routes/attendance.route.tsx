import type { RouteObject } from 'react-router-dom'
import ClientVisitPage from '@/pages/attendance/attendance-management/client-visit/page'
import AttendancePage from '@/pages/attendance/attendance-management/index/page'
import OvertimePage from '@/pages/attendance/attendance-management/overtime/page'
import ViewPage from '@/pages/attendance/report/detail/page'
import ReportPage from '@/pages/attendance/report/index/page'
import RequestPage from '@/pages/attendance/request-management/index/page'
import ScheduleDetailPage from '@/pages/attendance/schedule/detail/page'
import SchedulePage from '@/pages/attendance/schedule/index/page'

const attendanceRoute: RouteObject = {
  children: [
    {
      children: [
        {
          element: <SchedulePage />,
          path: '',
        },
      ],
      path: 'schedule',
    },
    {
      children: [
        {
          element: <ScheduleDetailPage />,
          path: '',
        },
      ],
      path: 'schedule/detail',
    },
    {
      children: [
        {
          element: <AttendancePage />,
          path: '',
        },
      ],
      path: 'attendance-management/attendance',
    },
    {
      children: [
        {
          element: <ClientVisitPage />,
          path: '',
        },
      ],
      path: 'attendance-management/client-visit',
    },
    {
      children: [
        {
          element: <OvertimePage />,
          path: '',
        },
      ],
      path: 'attendance-management/overtime',
    },
    {
      children: [
        {
          element: <RequestPage />,
          path: '',
        },
      ],
      path: 'request-management',
    },
    {
      children: [
        {
          element: <ReportPage />,
          path: '',
        },
      ],
      path: 'report',
    },
    {
      children: [
        {
          element: <ViewPage />,
          path: '',
        },
      ],
      path: 'report/:employeeId',
    },
  ],

  path: 'attendance',
}

export default attendanceRoute
