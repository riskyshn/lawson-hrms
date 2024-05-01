import type { RouteObject } from 'react-router-dom'

const calendarRoute: RouteObject = {
  lazy: () => import('@/pages/calendar/page'),
  path: 'calendar',
}

export default calendarRoute
