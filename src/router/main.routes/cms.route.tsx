import type { RouteObject } from 'react-router-dom'
import CmsPage from '@/pages/cms/page'

const cmsRoute: RouteObject = {
  element: <CmsPage />,

  path: 'cms',
}

export default cmsRoute
