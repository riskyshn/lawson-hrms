import type { RouteObject } from 'react-router-dom'

const dashboardRoute: RouteObject = {
  lazy: () => import('@/pages/dashboard/page'),
  path: '',
}

export default dashboardRoute
