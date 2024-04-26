import type { RouteObject } from 'react-router-dom'

import attendanceRoute from './attendance.route'
import calendarRoute from './calendar.route'
import candidatesRoute from './candidates.route'
import chatRoute from './chat.route'
import cmsRoute from './cms.route'
import dashboardRoute from './dashboard.route'
import employeesRoute from './employees.route'
import exploreRoute from './explore.route'
import jobRoute from './job.route'
import payrollRoute from './payroll.route'
import processRoute from './process.route'
import reportRoute from './report.route'
import settingsRoute from './settings.route'

const mainRoutes: RouteObject[] = [
  {
    lazy: () => import('@/components/Layout/MainLayout'),
    children: [
      dashboardRoute,
      jobRoute,
      candidatesRoute,
      settingsRoute,
      employeesRoute,
      processRoute,
      attendanceRoute,
      payrollRoute,
      cmsRoute,
      reportRoute,
      calendarRoute,
      chatRoute,
      exploreRoute,
    ],
  },
]

export default mainRoutes
