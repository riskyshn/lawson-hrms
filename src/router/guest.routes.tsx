import type { RouteObject } from 'react-router-dom'

const guestRoutes: RouteObject[] = [
  {
    children: [
      {
        lazy: () => import('@/pages/guest/job/requisition/page'),
        path: 'job/requisition',
      },
      {
        lazy: () => import('@/pages/guest/process/offering-letter/upload-documents/page'),
        path: 'process/offering-letter/upload-documents',
      },
      {
        lazy: () => import('@/pages/guest/process/offering-letter/upload-signed/page'),
        path: 'process/offering-letter/upload-signed',
      },
    ],
    lazy: () => import('@/Layout/GuestLayout'),
    path: 'guest',
  },
]

export default guestRoutes
