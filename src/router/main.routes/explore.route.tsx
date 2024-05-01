import type { RouteObject } from 'react-router-dom'

const exploreRoute: RouteObject = {
  lazy: () => import('@/pages/explore/page'),
  path: 'explore',
}

export default exploreRoute
