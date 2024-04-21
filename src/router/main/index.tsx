import type { RouteObject } from 'react-router-dom'

import dashboardRoute from './dashboard.route'
import jobRoute from './job.route'
import candidatesRoute from './candidates.route'
import settingsRoute from './settings.route'
import employeesRoute from './employees.route'
import processRoute from './process.route'
import attendanceRoute from './attendance.route'
import payrollRoute from './payroll.route'
import cmsRoute from './cms.route'
import reportRoute from './report.route'
import calendarRoute from './calendar.route'
import chatRoute from './chat.route'
import exploreRoute from './explore.route'

export const mainRoute: RouteObject = {
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
}
