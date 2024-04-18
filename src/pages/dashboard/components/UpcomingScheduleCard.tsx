import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncSearch from '@/hooks/use-async-search'
import { dashboardService } from '@/services'
import { Card, CardBody, CardHeader } from 'jobseeker-ui'
import React from 'react'
import { Link } from 'react-router-dom'

const UpcomingScheduleCard: React.FC = () => {
  const { pageData } = useAsyncSearch(dashboardService.upcomingSchedule, { limit: 20 })
  // const navigate = useNavigate()

  // const handleGoToCalendar = () => {
  //   navigate('/calendar?date=2024-01-01')
  // }

  return (
    <Card>
      <LoadingScreen show={!pageData} />
      {pageData && (
        <>
          <CardHeader className="flex h-16 items-center justify-between font-semibold">
            Upcoming Schedule
            {/* <button onClick={handleGoToCalendar} className="rounded bg-blue-500 px-3 py-2 text-white">
              Go to January 2024
            </button> */}
          </CardHeader>
          <CardBody className="chrome-scrollbar flex max-h-80 flex-col gap-3 overflow-y-auto">
            {pageData.content.map((el, i) => (
              <Link
                key={i}
                to={`#`}
                className="flex cursor-pointer flex-col gap-1 rounded-lg border border-l-4 border-l-success-300 bg-gray-50 p-2 transition-colors hover:border-success-300"
              >
                <span className="block text-sm">
                  {el.startTime} - {el.endTime}
                </span>
                <span className="block text-sm font-semibold">{el.name}</span>
                <span className="block text-xs text-gray-500">Lead by {el.name}</span>
              </Link>
            ))}
          </CardBody>
        </>
      )}
    </Card>
  )
}

export default UpcomingScheduleCard
