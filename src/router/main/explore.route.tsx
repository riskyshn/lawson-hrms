import type { RouteObject } from 'react-router-dom'

import ExplorePage from '@/pages/explore/ExplorePage'

const exploreRoute: RouteObject = {
  path: 'explore',
  name: 'Explore',
  element: <ExplorePage />,
}

export default exploreRoute
