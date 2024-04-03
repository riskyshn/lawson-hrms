import type { RouteObject } from 'react-router-dom'

import CmsPage from '@/pages/cms/CmsPage'

const cmsRoute: RouteObject = {
  path: 'cms',
  element: <CmsPage />,
  name: 'CMS',
}

export default cmsRoute
