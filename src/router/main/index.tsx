import type { RouteObject } from 'react-router-dom'

import MainLayout from '@/components/Layout/MainLayout'
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

export const mainRoute: RouteObject = {
  element: <MainLayout />,
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
  ],
}
