import type { RouteObject } from 'react-router-dom'

const candidatesRoute: RouteObject = {
  path: 'process',
  children: [
    { path: 'administration', lazy: () => import('@/pages/process/administration/page') },
    { path: 'selection', lazy: () => import('@/pages/process/selection/page') },
    {
      path: 'offering-letter',
      children: [
        { path: '', lazy: () => import('@/pages/process/offering-letter/index/page') },
        { path: ':applicantId/create', lazy: () => import('@/pages/process/offering-letter/create/page') },
        { path: ':applicantId/revise', lazy: () => import('@/pages/process/offering-letter/revise/page') },
        { path: ':applicantId/upload-documents', lazy: () => import('@/pages/process/offering-letter/upload-documents/page') },
        { path: ':applicantId/upload-signed', lazy: () => import('@/pages/process/offering-letter/upload-signed/page') },
        { path: ':applicantId/view-signed', lazy: () => import('@/pages/process/offering-letter/view-signed/page') },
        { path: ':applicantId/preview', lazy: () => import('@/pages/process/offering-letter/preview/page') },
      ],
    },
    { path: 'onboarding', lazy: () => import('@/pages/process/onboarding/page') },
  ],
}

export default candidatesRoute
