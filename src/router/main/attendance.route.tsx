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
          // element: <CandidatePoolPage />,
        },
      ],
    },
  ],
}

export default attendanceRoute
