import type { RouteObject } from 'react-router-dom'

const jobRoute: RouteObject = {
  path: 'job',
  name: 'Job',
  children: [
    {
      path: 'management',
      name: 'Management',
      children: [
        { path: '', lazy: () => import('@/pages/job/manajement/index/page') },
        { path: ':vacancyId', lazy: () => import('@/pages/job/manajement/detail/page') },
        { path: 'create', lazy: () => import('@/pages/job/manajement/create/page') },
        { path: ':vacancyId/edit', lazy: () => import('@/pages/job/manajement/edit/page') },
        { path: 'recruitment-stages', lazy: () => import('@/pages/job/manajement/recruitment-stages/page') },
      ],
    },
    {
      path: 'requisition',
      name: 'Requisition',
      children: [
        { path: '', lazy: () => import('@/pages/job/requisition/index/page') },
        { path: ':vacancyId', lazy: () => import('@/pages/job/requisition/detail/page') },
        { path: 'create', lazy: () => import('@/pages/job/requisition/create/page') },
        { path: ':vacancyId/edit', lazy: () => import('@/pages/job/requisition/edit/page') },
        { path: 'approve-list', lazy: () => import('@/pages/job/requisition/approve-list/page') },
      ],
    },
  ],
}

export default jobRoute
