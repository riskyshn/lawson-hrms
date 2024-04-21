import type { RouteObject } from 'react-router-dom'

const calendarRoute: RouteObject = {
  path: 'calendar',
  lazy: () => import('@/pages/calendar/page'),
}

export default calendarRoute
