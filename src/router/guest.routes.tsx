import type { RouteObject } from 'react-router-dom'

const guestRoutes: RouteObject[] = [
  {
    path: 'guest',
    lazy: () => import('@/components/Layout/GuestLayout'),
    children: [{ path: 'job/requisition', lazy: () => import('@/pages/guest/job/requisition/page') }],
  },
]

export default guestRoutes
