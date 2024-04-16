import LoadingScreen from '@/components/Elements/Layout/LoadingScreen'
import useAsyncSearch from '@/hooks/use-async-search'
import { dashboardService } from '@/services'
import { Card, CardBody, CardHeader } from 'jobseeker-ui'
import React from 'react'
import { Link } from 'react-router-dom'

const UpcomingScheduleCard: React.FC = () => {
  const { pageData } = useAsyncSearch<IDashboardSchedule>({
    action: dashboardService.upcomingSchedule,
    params: { limit: 20 },
  })

  return (
    <Card>
      <LoadingScreen show={!pageData} />
      {pageData && (
        <>
          <CardHeader className="h-16 font-semibold">Upcoming Schedule</CardHeader>
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
