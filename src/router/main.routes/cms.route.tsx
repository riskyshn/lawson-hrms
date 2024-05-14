import type { RouteObject } from 'react-router-dom'

const cmsRoute: RouteObject = {
  children: [{ lazy: () => import('@/pages/cms/page'), path: '' }],

  path: 'cms',
}

export default cmsRoute
