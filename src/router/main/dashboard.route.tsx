import type { RouteObject } from 'react-router-dom'

const dashboardRoute: RouteObject = {
  path: '',
  lazy: () => import('@/pages/dashboard/page'),
}

export default dashboardRoute
