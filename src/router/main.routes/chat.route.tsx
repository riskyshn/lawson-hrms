import type { RouteObject } from 'react-router-dom'

const chatRoute: RouteObject = { path: 'chat', lazy: () => import('@/pages/chat/page') }

export default chatRoute
