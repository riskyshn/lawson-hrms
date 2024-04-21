import type { RouteObject } from 'react-router-dom'

const reportRoute: RouteObject = {
  path: 'report',
  name: 'Report',
  children: [
    { path: 'demography', lazy: () => import('@/pages/report/demography/page') },
    { path: 'summary', lazy: () => import('@/pages/report/summary/page') },
  ],
}

export default reportRoute
