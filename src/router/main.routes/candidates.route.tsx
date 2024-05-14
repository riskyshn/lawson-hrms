import type { RouteObject } from 'react-router-dom'

const candidatesRoute: RouteObject = {
  children: [
    { lazy: () => import('@/pages/candidates/pool/index/page'), path: 'pool' },
    { lazy: () => import('@/pages/candidates/management/index/page'), path: 'management' },
    { lazy: () => import('@/pages/candidates/shortlisted/index/page'), path: 'shortlisted' },
    { lazy: () => import('@/pages/candidates/rejected/index/page'), path: 'rejected' },
    { lazy: () => import('@/pages/candidates/withdraw/index/page'), path: 'withdraw' },
    { lazy: () => import('@/pages/candidates/blacklisted/index/page'), path: 'blacklisted' },
    { lazy: () => import('@/pages/candidates/profile/index/page'), path: 'profile/:candidateId' },
    { lazy: () => import('@/pages/employees/previous-employee/page'), path: 'previous-employee' },
  ],

  path: 'candidates',
}

export default candidatesRoute
