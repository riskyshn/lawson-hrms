import type { RouteObject } from 'react-router-dom'

const jobRoute: RouteObject = {
  children: [
    {
      children: [
        { lazy: () => import('@/pages/job/manajement/index/page'), path: '' },
        { lazy: () => import('@/pages/job/manajement/detail/page'), path: ':vacancyId' },
        { lazy: () => import('@/pages/job/manajement/create/page'), path: 'create' },
        { lazy: () => import('@/pages/job/manajement/edit/page'), path: ':vacancyId/edit' },
        { lazy: () => import('@/pages/job/manajement/recruitment-stages/page'), path: 'recruitment-stages' },
      ],
      path: 'management',
    },
    {
      children: [
        { lazy: () => import('@/pages/job/requisition/index/page'), path: '' },
        { lazy: () => import('@/pages/job/requisition/detail/page'), path: ':vacancyId' },
        { lazy: () => import('@/pages/job/requisition/create/page'), path: 'create' },
        { lazy: () => import('@/pages/job/requisition/edit/page'), path: ':vacancyId/edit' },
        { lazy: () => import('@/pages/job/requisition/approve-list/page'), path: 'approve-list' },
      ],
      path: 'requisition',
    },
  ],

  path: 'job',
}

export default jobRoute
