import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardHeader, LoadingScreen } from 'jobseeker-ui'
import { InboxIcon } from 'lucide-react'
import moment from 'moment'
import { useAsyncSearch } from '@/hooks'
import { dashboardService } from '@/services'

const UpcomingScheduleCard: React.FC = () => {
  const { pageData } = useAsyncSearch(dashboardService.upcomingSchedule, { limit: 20 })

  return (
    <Card className="flex h-[500px] flex-col">
      <LoadingScreen show={!pageData} />
      {pageData && (
        <>
          <CardHeader className="flex h-16 items-center justify-between font-semibold">Upcoming Schedule</CardHeader>
          <CardBody className="chrome-scrollbar flex flex-1 flex-col gap-3 overflow-y-auto">
            {pageData.content.map((el, i) => (
              <Link
                className="flex cursor-pointer flex-col gap-1 rounded-lg border border-l-4 border-l-success-300 bg-gray-50 p-2 transition-colors hover:border-success-300"
                key={i}
                to={`/calendar?date=${el?.startedAt}`}
              >
                <span className="block text-xs">
                  {moment.utc(el.startedAt).local().format('DD/MM/YYYY HH:mm')} -{' '}
                  {moment.utc(el.endedAt).local().format('DD/MM/YYYY HH:mm')}
                </span>
                <span className="block text-sm font-semibold">{el.name}</span>
                <span className="block text-xs text-gray-500">Lead by {el.name}</span>
              </Link>
            ))}

            {pageData.content.length == 0 && (
              <div className="flex flex-1 flex-col items-center justify-center p-3">
                <div className="mb-4 flex animate-pulse justify-center text-gray-900">
                  <InboxIcon className="md:h-28 md:w-28" strokeWidth={0.5} />
                </div>
                <p className="mx-auto max-w-lg text-center text-sm font-light">
                  No upcoming schedules found. Stay tuned for future updates!
                </p>
              </div>
            )}
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default UpcomingScheduleCard
