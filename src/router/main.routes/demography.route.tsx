import type { RouteObject } from 'react-router-dom'

const demographyRoute: RouteObject = { lazy: () => import('@/pages/demography/page'), path: 'demography' }

export default demographyRoute
