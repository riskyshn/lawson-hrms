import type { RouteObject } from 'react-router-dom'

const settingsRoute: RouteObject = {
  path: 'settings',
  name: 'Settings',
  children: [
    { path: 'company', lazy: () => import('@/pages/settings/company/page') },
    { path: 'branches', lazy: () => import('@/pages/settings/branches/page') },
    { path: 'departments', lazy: () => import('@/pages/settings/departments/page') },
    { path: 'positions', lazy: () => import('@/pages/settings/positions/page') },
    { path: 'job-levels', lazy: () => import('@/pages/settings/job-levels/page') },
    { path: 'employment-status', lazy: () => import('@/pages/settings/employment-status/page') },
    { path: 'document-request', lazy: () => import('@/pages/settings/document-request/page') },
    { path: 'roles', lazy: () => import('@/pages/settings/roles/page') },
    { path: 'permissions', lazy: () => import('@/pages/settings/permissions/page') },
    { path: 'work-placements', lazy: () => import('@/pages/settings/work-placements/page') },
  ],
}

export default settingsRoute
