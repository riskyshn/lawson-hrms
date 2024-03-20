import type { RouteObject } from 'react-router-dom'

import ViewPage from '@/pages/process/offering-letter/view/ViewPage'
import UploadPage from '@/pages/process/offering-letter/upload/UploadPage'

const clientRoute: RouteObject = {
  path: 'client',
  children: [
    { path: 'view-offering-letter/:id', element: <ViewPage /> },
    { path: 'upload-document/:id', element: <UploadPage /> },
  ],
}

export default clientRoute
