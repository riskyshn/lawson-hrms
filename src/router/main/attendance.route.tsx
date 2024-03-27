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
  ],
}

export default attendanceRoute
