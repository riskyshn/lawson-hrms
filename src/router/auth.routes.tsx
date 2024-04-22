import type { RouteObject } from 'react-router-dom'

const authRoutes: RouteObject[] = [
  {
    path: 'auth',
    lazy: () => import('@/components/Layout/AuthLayout'),
    children: [
      { path: 'login', lazy: () => import('@/pages/auth/login/page') },
      { path: 'forgot-password', lazy: () => import('@/pages/auth/forgot-password/page') },
      { path: 'reset-password', lazy: () => import('@/pages/auth/reset-password/page') },
    ],
  },
]

export default authRoutes
