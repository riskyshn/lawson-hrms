import type { RouteObject } from 'react-router-dom'

import MainLayout from '@/components/Layout/MainLayout'
import dashboardRoute from './dashboard.route'
import jobRoute from './job.route'
import candidatesRoute from './candidates.route'
import settingsRoute from './settings.route'
import employeeRoute from './employee.route'
import processRoute from './process.route'

export const mainRoute: RouteObject = {
  element: <MainLayout />,
  children: [dashboardRoute, jobRoute, candidatesRoute, settingsRoute, employeeRoute, processRoute],
}
