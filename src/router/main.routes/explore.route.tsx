import type { RouteObject } from 'react-router-dom'

const exploreRoute: RouteObject = {
  path: 'explore',
  lazy: () => import('@/pages/explore/page'),
}

export default exploreRoute
