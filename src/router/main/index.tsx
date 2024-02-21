import type { RouteObject } from 'react-router-dom'

import MainLayout from '@/components/Layout/MainLayout/MainLayout'
import dashboardRoute from './dashboard.route'
import jobRoute from './job.route'

export const mainRoute: RouteObject = {
  element: <MainLayout />,
  children: [dashboardRoute, jobRoute],
}
