import type { RouteObject } from 'react-router-dom'

const authRoutes: RouteObject[] = [
  {
    children: [
      { lazy: () => import('@/pages/auth/login/page'), path: 'login' },
      { lazy: () => import('@/pages/auth/forgot-password/page'), path: 'forgot-password' },
      { lazy: () => import('@/pages/auth/reset-password/page'), path: 'reset-password' },
    ],
    lazy: () => import('@/layouts/AuthLayout'),
    path: 'auth',
  },
]

export default authRoutes
