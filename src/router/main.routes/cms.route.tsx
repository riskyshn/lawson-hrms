import type { RouteObject } from 'react-router-dom'
import CmsPage from '@/pages/cms/page'

const cmsRoute: RouteObject = {
  element: <CmsPage />,
  name: 'CMS',
  path: 'cms',
}

export default cmsRoute
