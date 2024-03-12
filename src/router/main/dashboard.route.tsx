import type { RouteObject } from 'react-router-dom'

import DashboardPage from '@/pages/dashboard/DashboardPage'

const dashboardRoute: RouteObject = {
  path: '',
  element: <DashboardPage />,
  name: 'Dashboard',
}

export default dashboardRoute
