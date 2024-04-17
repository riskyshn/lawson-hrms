import type { RouteObject } from 'react-router-dom'

import CalendarPage from '@/pages/calendar/index/CalendarPage'

const calendarRoute: RouteObject = {
  path: 'calendar',
  element: <CalendarPage />,
  name: 'Calendar',
}

export default calendarRoute
