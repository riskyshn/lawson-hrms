import type { RouteObject } from 'react-router-dom'

const reportRoute: RouteObject = {
  children: [
    { lazy: () => import('@/pages/report/demography/page'), path: 'demography' },
    { lazy: () => import('@/pages/report/summary/page'), path: 'summary' },
  ],
  name: 'Report',
  path: 'report',
}

export default reportRoute
