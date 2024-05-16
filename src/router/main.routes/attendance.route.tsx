import type { RouteObject } from 'react-router-dom'

const attendanceRoute: RouteObject = {
  children: [
    { lazy: () => import('@/pages/attendance/schedule/index/page'), path: 'schedule' },
    { lazy: () => import('@/pages/attendance/schedule/detail/page'), path: 'schedule/detail' },
    { lazy: () => import('@/pages/attendance/attendance-management/index/page'), path: 'attendance-management/attendance' },
    { lazy: () => import('@/pages/attendance/attendance-management/client-visit/page'), path: 'attendance-management/client-visit' },
    { lazy: () => import('@/pages/attendance/attendance-management/overtime/page'), path: 'attendance-management/overtime' },
    { lazy: () => import('@/pages/attendance/request-management/index/page'), path: 'request-management' },
    { lazy: () => import('@/pages/attendance/report/index/page'), path: 'report' },
    { lazy: () => import('@/pages/attendance/report/detail/page'), path: 'report/:employeeId' },
  ],

  path: 'attendance',
}

export default attendanceRoute
