import type { RouteObject } from 'react-router-dom'

const settingsRoute: RouteObject = {
  children: [
    { lazy: () => import('@/pages/settings/company/page'), path: 'company' },
    { lazy: () => import('@/pages/settings/branches/page'), path: 'branches' },
    { lazy: () => import('@/pages/settings/departments/page'), path: 'departments' },
    { lazy: () => import('@/pages/settings/positions/page'), path: 'positions' },
    { lazy: () => import('@/pages/settings/job-levels/page'), path: 'job-levels' },
    { lazy: () => import('@/pages/settings/employment-status/page'), path: 'employment-status' },
    { lazy: () => import('@/pages/settings/document-request/page'), path: 'document-request' },
    { lazy: () => import('@/pages/settings/roles/page'), path: 'roles' },
    { lazy: () => import('@/pages/settings/permissions/page'), path: 'permissions' },
    { lazy: () => import('@/pages/settings/work-placements/page'), path: 'work-placements' },
  ],

  path: 'settings',
}

export default settingsRoute
