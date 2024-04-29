import type { RouteObject } from 'react-router-dom'

const guestRoutes: RouteObject[] = [
  {
    path: 'guest',
    lazy: () => import('@/components/Layout/GuestLayout'),
    children: [
      {
        path: 'job/requisition',
        lazy: () => import('@/pages/guest/job/requisition/page'),
      },
      {
        path: 'process/offering-letter/upload-documents',
        lazy: () => import('@/pages/guest/process/offering-letter/upload-documents/page'),
      },
      {
        path: 'process/offering-letter/preview',
        lazy: () => import('@/pages/guest/process/offering-letter/preview/page'),
      },
    ],
  },
]

export default guestRoutes
